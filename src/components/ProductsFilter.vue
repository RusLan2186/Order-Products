<template>
  <div class="filter">
    <h1 class="title">Products</h1>
    <div class="search__wrapper">
      <input
        type="text"
        placeholder="Search..."
        v-model="localSearchQuery"
        class="search-input"
        :class="{ expanded: isInputFocused }"
        @focus="isInputFocused = true"
        @blur="isInputFocused = false"
      />
      <span v-if="localSearchQuery" @mousedown.prevent="handleClearSearch" class="search__clear">
        X
      </span>
    </div>
    <div @click.stop class="filter__wrapper">
      Type: <span class="filter__title" @click="toggleFilterList">{{ selectedFilterText }}</span>
      <ul class="filter__list" v-if="isVisibleFilterList">
        <li v-for="option in filterOptions" :key="option.value" @click="selectFilter(option.value)">
          {{ option.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductFilter',
  props: {
    searchQuery: {
      type: String,
      required: true
    },
    selectedFilter: {
      type: String,
      required: true
    },
    filterOptions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isVisibleFilterList: false,
      isInputFocused: false,
      localSearchQuery: this.searchQuery,
      localSelectedFilter: this.selectedFilter
    }
  },
  computed: {
    selectedFilterText() {
      const selectedOption = this.filterOptions.find(
        (option) => option.value === this.localSelectedFilter
      )
      return selectedOption ? selectedOption.text : 'Select option'
    }
  },
  watch: {
    searchQuery(newValue) {
      this.localSearchQuery = newValue
    },
    selectedFilter(newValue) {
      this.localSelectedFilter = newValue
    },
    localSearchQuery(newValue) {
      this.$emit('update:searchQuery', newValue)
    },
    localSelectedFilter(newValue) {
      this.$emit('update:selectedFilter', newValue)
    }
  },
  methods: {
    toggleFilterList() {
      this.isVisibleFilterList = !this.isVisibleFilterList
    },
    selectFilter(value) {
      this.isVisibleFilterList = false
      this.localSelectedFilter = value
    },
    handleClearSearch() {
      this.isInputFocused = true
      this.localSearchQuery = ''
    },
    hideFilterList() {
      this.isVisibleFilterList = false
    }
  }
}
</script>

<style scoped>
.filter {
  display: flex;
  justify-content: flex-start;
  column-gap: 5px;
  align-items: center;
  margin-bottom: 30px;
  width: 700px;
}
.search__wrapper {
  position: relative;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-input {
  padding: 5px;
  font-size: 16px;
  margin-right: 20px;
  transition: width 0.3s ease;
  width: 200px;
}
.expanded {
  width: calc(80% - 40px);
  left: -20px;
  outline: none;
}

.search__clear {
  display: inline-block;
  cursor: pointer;
  transition: width 0.3s ease;
  transform: translateX(-50px);
}

.search__clear:hover {
  color: #55a45e;
}

.filter__wrapper {
  position: relative;
  width: 20%;
  z-index: 50;
}

.filter__title {
  cursor: pointer;
  margin-left: 5px;
  transition: 0.3s all ease 0s;
  color: #55a45e;
}

.filter__title:hover {
  color: rgb(23, 23, 23);
}

.filter__list {
  margin-top: 5px;
  position: absolute;
  cursor: pointer;
  left: 0;
  border: 2px solid #55a45e;
  background-color: #fff;
  border-radius: 12px;
}

.filter__list li {
  padding: 5px 10px;
  transition: 0.3s all ease 0s;
  width: 100%;
}

.filter__list li:hover {
  background-color: #55a45e;
  color: #fff;
}
</style>
