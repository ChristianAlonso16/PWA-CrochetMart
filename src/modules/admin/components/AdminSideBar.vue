<template>
  <aside class="sidebar">
    <h1>CrochetMart</h1>
    <nav>
      <ul>
        <li><i class="pi pi-home"></i> Inicio</li>
        <li><i class="pi pi-box"></i> Productos</li>
        <li><i class="pi pi-list"></i> Categorías</li>
        <li><i class="pi pi-users"></i> Usuarios</li>
        <li><i class="pi pi-shopping-cart"></i> Ventas</li>
        <li><i class="pi pi-key"></i> Key</li>
      </ul>
    </nav>
    <div class="footer">
      <p>Ayuda y información</p>
      <p>Cerrar sesión</p>
    </div>
  </aside>
</template>

<script>
export default {
  name: "AdminSideBar",
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f8f8f8;
  padding: 20px;
}
h1 {
  font-size: 1.5em;
  margin-bottom: 1em;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  align-items: center;
  margin: 10px 0;
}
.footer {
  margin-top: 2em;
  color: #777;
}
</style>
