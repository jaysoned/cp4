<template>
  <div class="wrapper">
    <div class="all-books">
      <div class="book" v-for="book in books" :key="book._id">
        <div>
          <router-link :to="{ name: 'Edit', params: { bookID: book._id } }">
            <img :src="imageLocation(book)" />
          </router-link>
          <h5>{{ book.title }}</h5>
          <p>By: {{ book.author }}</p>
          <p>Rating: {{ book.rating }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookList",
  props: {
    books: Array,
  },
  methods: {
    imageLocation(book) {
      if (book.hasURL) {
        return "" + book.path;
      } else {
        return "" + book.path;
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-content: center;
}

.all-books {
  display: grid;

  align-self: center;
  column-gap: 50px;
}

.book {
  width: 200px;
}

.book img {
  max-width: 100%;
}

/* Grid on large screens */
@media only screen and (min-width: 1024px) {
  .all-books {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

/* Grid on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .all-books {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

/* Grid on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .all-books {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
