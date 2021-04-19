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
          <star-rating :increment="0.1" @rating-selected="setRating" />
        </div>
        <p class="item">Book cover Image</p>
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
      <button id="submitter" @click="upload" class="item">Add Book To List</button>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import axios from "axios";
export default {
  data() {
    return {
      bookTitle: "",
      bookAuthor: "",
      bookRating: 0,
      bookGenere: [],
      file: null,
      currentGenere: "",
    };
  },
  components: {
    StarRating,
  },
  methods: {
    subtract(index) {
      this.bookGenere.splice(index, 1);
    },
    fileChanged(event) {
      this.file = event.target.files[0];
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
    upload() {
      if (
        !(
          this.bookRating &&
          this.bookTitle &&
          this.bookAuthor &&
          this.bookGenere.length &&
          this.file
        )
      ) {
        alert("All fields are required");
      } else {
        document.getElementById("submitter").style.visibility = "hidden";
        this.uploadBook();
      }
    },
    async uploadBook() {
      try {
        const formData = new FormData();
        if (this.title === "") {
          throw Error("Title cannot be blank");
        }
        formData.append("photo", this.file, this.file.name);
        let r1 = await axios.post("/api/photos", formData);
        await axios.post("/api/books", {
          title: this.bookTitle,
          author: this.bookAuthor,
          path: r1.data.path,
          rating: this.bookRating,
          generes: this.bookGenere
        });
        alert(this.bookTitle + " was added.");
        document.getElementById("submitter").style.visibility = "visible";
        this.bookTitle = this.bookAuthor = this.bookImg = "";
        this.bookGenere = [];
      } catch (error) {
        alert("Error: " + error);
        document.getElementById("submitter").style.visibility = "visible";
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