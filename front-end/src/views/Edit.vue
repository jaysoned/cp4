<template>
  <div class="add-view">
    <div class="wrapper">
      <div class="generic">
        <p class="item">Title</p>
        <textarea
          class="item-text"
          name="Title"
          id="add-title"
          rows="1"
          v-model="bookTitle"
          placeholder="Title"
        ></textarea>
        <p class="item">Author</p>
        <textarea
          class="item-text"
          name="Author"
          id="add-author"
          rows="1"
          v-model="bookAuthor"
          placeholder="Author"
        ></textarea>
        <div class="item">
          <star-rating
            :rating="bookRating"
            :increment="0.1"
            @rating-selected="setRating"
          />
        </div>
        <p class="item">
          Book cover Image (leave unselected to keep old image)
        </p>
        <input type="file" name="photo" @change="fileChanged" />
      </div>
      <div class="genere">
        <p class="item">Genere</p>
        <div class="first-genere">
          <textarea
            class="item-text"
            name="genere"
            id="add-genere"
            rows="1"
            v-model="currentGenere"
            placeholder="Genere"
          ></textarea
          ><button class="plus" @click="addGenere()">+</button>
        </div>
        <div
          class="added-genere item"
          v-for="(genere, index) in bookGenere"
          :key="index"
        >
          <p>{{ genere }}</p>
          <button class="minus" @click="subtract(index)">-</button>
        </div>
      </div>
      <img class="uploaded-img" src="" alt="" />
    </div>
    <div class="sumbit-button">
      <button @click="editBook" class="item">Edit Item</button>
      <button @click="deleteBook" class="item">Delete</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StarRating from "vue-star-rating";
export default {
  name: "Edit",
  data() {
    return {
      book: null,
      file: null,
      bookTitle: "",
      bookAuthor: "",
      bookRating: 0,
      bookGenere: [],
      bookImg: "",
      currentGenere: "",
      oldURL: "",
    };
  },
  created() {
    let index = 0;
    for (let booky of this.$root.$data.books) {
      if (booky._id == this.$route.params.bookID) {
        break;
      }
      ++index;
    }
    this.book = this.$root.$data.books[index];
    this.bookTitle = this.book.title;
    this.bookAuthor = this.book.author;
    this.bookRating = this.book.rating;
    this.bookGenere = this.book.generes;
    this.oldURL = this.bookImg = this.book.path;
  },
  components: {
    StarRating,
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    subtract(index) {
      this.bookGenere.splice(index, 1);
    },
    addGenere() {
      if (this.currentGenere) {
        this.bookGenere.push(this.currentGenere);
        this.currentGenere = "";
      }
    },
    setRating(rating) {
      this.bookRating = rating;
    },
    async editBook() {
      if (this.bookTitle) this.book.title = this.bookTitle;
      if (this.bookAuthor) this.book.author = this.bookAuthor;
      if (this.bookRating) this.book.rating = this.bookRating;
      if (this.bookGenere.length) this.book.generes = this.bookGenere;
      try {
        let imgPath;
        if (this.file) {
          const formData = new FormData();
          formData.append("photo", this.file, this.file.name);
          imgPath = await axios.post("/api/photos", formData);
          this.book.path = imgPath;
        }
        await axios.put("/api/books/" + this.book._id, this.book);
        alert("Edited!");
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async deleteBook() {
      try {
        await axios.delete("/api/books/" + this.book._id);
        let index = 0;
        for (let book of this.$root.$data.books) {
          if (book._id == this.book._id) {
            this.$delete(this.$root.$data.books, index);
            this.oldURL = this.bookImg = this.bookTitle = this.bookAuthor = "";
            this.book = null;
            this.bookRating = 0;
            this.bookGenere = [];
            break;
          }
          ++index;
        }
        alert("Deleted!");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
textarea {
  width: 100%;
}

.red {
  background-color: red;
  width: 100%;
  height: 400px;
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr;
}

.item {
  margin-top: 20px;
}

.minus {
  margin: 5px;
}
.first-genere {
  display: flex;
}
.plus {
  margin-left: 5px;
}

.added-genere {
  display: flex;
  justify-content: center;
}

button {
  margin-left: 10px;
}

/*large screens */
@media only screen and (min-width: 1024px) {
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .add-view {
    max-width: 960px;
    margin: auto;
  }
  .genere {
    margin-left: 20px;
  }
}

/*medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .add-view {
    max-width: 700px;
    margin: auto;
  }
}

/*small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .add-view {
    max-width: 500px;
    margin: auto;
  }
}

@media only screen and (max-width: 540px) {
  .add-view {
    max-width: 300px;
    margin: auto;
  }
}
</style>