<template>
    <div>
        <button>Home</button>
    </div>
</template>

<style scoped>
div {
  width: 100%;
  height: 4rem;
  background-color: #FFFBFA;
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 2rem;
  
}

a {
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

a:hover,
a:active,
a.active {
  color: #EF7F4C;
  /* border-color: #f1a80a; */
  /* background-color: #1a037e; */
}

router-link {
    color: black;
}
</style>