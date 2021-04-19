<template>
  <div class="home">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-container>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Left aligned nav items -->
          <b-navbar-nav class="me-auto">
            <b-nav-item @click="sortTitle()">Title</b-nav-item>
            <b-nav-item @click="sortAuthor()">Author</b-nav-item>
            <b-nav-item @click="sortGenere()">Genere</b-nav-item>
            <b-nav-item @click="sortRating()">Rating</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <div>
      <div v-if="searchType" class="wrapper">
        <div class="search">
          <form class="pure-form">
            <i class="fas fa-search"></i
            ><input :placeholder="searchType" v-model="searchString" />
          </form>
        </div>
      </div>
      <div class="rating-search" v-else>
        <div>
          <p>Choose a rating to see books rated that level and better</p>
        </div>
        <div class="extra-rating-wrapper">
          <star-rating :increment="0.1" @rating-selected="setRating" />
        </div>
      </div>
    </div>
    <p>Select a book to edit its information</p>
    <BookList :books="displayedBooks" />
  </div>
</template>

<script>
// @ is an alias to /src
import BookList from "../components/BookList.vue";
import StarRating from "vue-star-rating";
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      books: [],
      searchString: "",
      searchFunction: null,
      searchType: "Search by Title",
      searchRating: 0
    };
  },
  created() {
    this.getBooks();
    this.sortTitle();
  },
  components: {
    BookList,
    StarRating,
  },
  methods: {
    async getBooks() {
      try {
        let response = await axios.get("/api/books");
        this.books = response.data;
        this.$root.$data.books = this.books;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    sortTitle() {
      this.searchType = "Search by Title";
      this.searchFunction = function (book) {
        return (
          book.title.toLowerCase().search(this.searchString.toLowerCase()) >= 0
        );
      };
    },
    sortAuthor() {
      this.searchType = "Search by Author";
      this.searchFunction = function (book) {
        return (
          book.author.toLowerCase().search(this.searchString.toLowerCase()) >= 0
        );
      };
    },
    sortGenere() {
      this.searchType = "Search by Genere";
      this.searchFunction = function (book) {
        let generes = book.generes;
        let answere = generes.filter(
          (genere) =>
            genere.toLowerCase().search(this.searchString.toLowerCase()) >= 0
        );
        return answere.length;
      };
    },
    sortRating() {
      this.searchType = "";
      this.searchFunction = function (book) {
        return book.rating >= this.searchRating;
      };
    },
    setRating(rating) {
      this.searchRating = rating;
    }
  },
  computed: {
    displayedBooks() {
      return this.books.filter((book) => {
        try {
          return this.searchFunction(book);
        } catch (error) {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}

.rating-search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.extra-rating-wrapper {
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: center;
}
.vue-star-rating {
  align-self: center;
}
</style>