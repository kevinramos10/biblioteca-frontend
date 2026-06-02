import { createElement, use, useState } from "react";
import './App.css'

function App() {

  //MOSTRAR AUTORES-----------------
  const [autores, setAutores] = useState([]);
  function mostrarAutores(){

    /*Limpiamos campos para que no salga todo junto*/
    setAutores([]);
    setCategorias([]);
    setLibros([]);
    setAgregarAu(false);
    setAgregarCat(false);
    setAgregarLi(false);

    fetch("http://localhost:8080/autores")
    .then(res => res.json())
    .then(data => {
      setAutores(data);
    })
  }

  //MOSTRAR CATEGORIAS--------------
  const [categorias, setCategorias] = useState([]);
  function mostrarCategorias(){

    /*Limpiamos campos para que no salga todo junto*/
    setAutores([]);
    setCategorias([]);
    setLibros([]);
    setAgregarAu(false);
    setAgregarCat(false);
    setAgregarLi(false);

    fetch("http://localhost:8080/categorias")
    .then(res => res.json())
    .then(data =>{
      setCategorias(data);
    })
  }

  //MOSTRAR LIBROS------------
  const [libros, setLibros] = useState([]);
  function mostrarLibros(){

    /*Limpiamos campos para que no salga todo junto*/
    setAutores([]);
    setCategorias([]);
    setLibros([]);
    setAgregarAu(false);
    setAgregarCat(false);
    setAgregarLi(false);


    fetch("http://localhost:8080/libros")
    .then(res => res.json())
    .then(data => {
      setLibros(data);
    })
  }

  //AGREGAR AUTORES-------------------
  const [agregarAu, setAgregarAu] = useState(false);
  function agregarAutores(){
    setAutores([]);
    setCategorias([]);
    setLibros([]);

    setAgregarAu(true);
    setAgregarCat(false);
    setAgregarLi(false);

  }
  const [nombreAutor, setNombreAutor] = useState("");
  const [errorAutor, setErrorAutor] = useState("");
  const [nacionalidadAutor, setNacionalidadAutor] = useState("");
  const [errorNacionalidad, setErrorNacionalidad] = useState("");

  function guardarAutor(){

    let hayError = false;

    setErrorAutor("");
    if(nombreAutor.trim() === ""){
      setErrorAutor("El nombre del autor es obligatorio");
      hayError = true;
    }
    setErrorNacionalidad("");
    if(nacionalidadAutor.trim() === ""){
      setErrorNacionalidad("La nacionalidad del autor es obligatorio");
      hayError = true;
    }
    if(hayError){
      return;
    }


    fetch("http://localhost:8080/autores", {

      method: "POST",

      headers:{
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        nombre: nombreAutor,
        nacionalidad: nacionalidadAutor
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("Autor agregado");

      setNombreAutor("");
      setNacionalidadAutor("");

    })

  }
  
  //ACTUALIZAR AUTORES-------------------
  const [autorEditado, setAutorEditado] = useState(null);
  function editarAutor(autor){
    
    setAutores([]);
    setAgregarAu(true);
    setAutorEditado(autor);
    setNombreAutor(autor.nombre);
    setNacionalidadAutor(autor.nacionalidad);
  }
  function actualizarAutor(){

    fetch(`http://localhost:8080/autores/${autorEditado.id}`, {

      method: "PUT",

      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombreAutor,
        nacionalidad: nacionalidadAutor
      })
    })
    .then(res => res.json())
    .then(data =>{

      console.log("Autor actualizado");
      setNombreAutor("");
      setNacionalidadAutor("");
      setAutorEditado(null);
      mostrarAutores();
    })

  }
  //-------------------------------------

  //ELIMINAR AUTOR-----------------
  function eliminarAutor(id){
    const confirmar = window.confirm("Seguro que desea eliminar este autor");

    if(confirmar){

      fetch(`http://localhost:8080/autores/${id}`, {

        method:"DELETE"

      })
      .then(res => res.json())
      .then(data => {
        console.log("Autor Eliminado")
        mostrarAutores();
      })
    }
  }
  //-------------------------------------

  //AGREGAR CATEGORIA-------------------
  const [agregarCat, setAgregarCat] = useState(false);
  function agregarCategorias(){
    setAutores([]);
    setCategorias([]);
    setLibros([]);

    setAgregarCat(true);
    setAgregarAu(false);
    setAgregarLi(false);
  }
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [errorCategoria, setErrorCategoria] = useState("");
  function guardarCategoria(){

    setErrorCategoria("");
    if(nombreCategoria.trim() === ""){
      setErrorCategoria("El nombre de la categoria es obligatorio");
      return;
    }

    fetch("http://localhost:8080/categorias", {
      
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        nombre: nombreCategoria
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("Categoria agregada");

      setNombreCategoria("");

    })

  }
  //-------------------------------------

  //ACTUALIZAR CATEGORIA-------------------
  const [categoriaEditado, setCategoriaEditado] = useState(null);
  function editarCategoria(categoria){

    setCategorias([]);
    setAgregarCat(true);
    setCategoriaEditado(categoria);
    setNombreCategoria(categoria.nombre);
  }

  function actualizarCategoria(){

    fetch(`http://localhost:8080/categorias/${categoriaEditado.id}`, {

      method: "PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombreCategoria
      })
    })
    .then(res => res.json())
    .then(data => {

      console.log("Categoria actualizada");
      setNombreCategoria("");
      setCategoriaEditado(null);
      mostrarCategorias();

    })
  }
  //-------------------------------------

  //ELIMINAR CATEGORIA--------------
  function eliminarCategoria(id){

    const confirmar = window.confirm("Seguro que desea eliminar esta categoria?");

    if(confirmar){

      fetch(`http://localhost:8080/categorias/${id}`,{

        method: "DELETE"

      })
      .then(res => res.json())
      .then(data => {
        console.log("Categoria Eliminada!");
        mostrarCategorias();
      })

    }

  }
  //-------------------------------------


  //AGREGAR LIBRO----------------------------
  const [agregarLi, setAgregarLi] = useState(false);
  const [listaAutores, setListaAutores] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  function AgregarLibro(){
    
    setAutores([]);
    setCategorias([]);
    setLibros([]);

    setAgregarCat(false);
    setAgregarAu(false);
    setAgregarLi(true);

    /*Traer los autores la lista*/
    fetch("http://localhost:8080/autores")
      .then(res => res.json())
      .then(data => {
        setListaAutores(data);
      });
    
    fetch("http://localhost:8080/categorias")
    .then(res => res.json())
    .then(data =>{
      setListaCategorias(data);
    })
  }

  const [tituloLibro, setTituloLibro] = useState("");
  const [errorTitulo, setErrorTitulo] = useState("");
  const [anioPublicacionLibro, setAnioPublicacionLibro] = useState("");
  const [errorAnio, setErrorAnio] = useState("");
  const [autorLibro, setAutorLibro] = useState("");
  const [errorAutorLibro, setErrorAutorLibro] = useState("");
  const [categoriasSeleccionadasLibro, setCategoriasSeleccionadasLibro] = useState([]);
  const [errorCategoriasSele, setErrorCategoriasSele] = useState("");

  function manejarCategorias(e){

    const id = parseInt(e.target.value);

    if(e.target.checked){

      setCategoriasSeleccionadasLibro([
        ...categoriasSeleccionadasLibro,
        id
      ]);
    }else{

      setCategoriasSeleccionadasLibro(
        categoriasSeleccionadasLibro.filter(
          categoria => categoria !==id
        )
      );
    }
  }

  function guardarLibro(){

    let hayError = false;
    setErrorTitulo("");
    setErrorAnio("");
    setErrorAutorLibro("");
    setErrorCategoriasSele("");
    if(tituloLibro.trim() === ""){
      setErrorTitulo("El titulo es obligatorio");
      hayError = true;
    }
    if(anioPublicacionLibro.trim() === ""){
      setErrorAnio("El año de publicacion es obligatorio");
      hayError = true;
    }
    if(autorLibro.trim() === ""){
      setErrorAutorLibro("Seleccione un autor");
      hayError = true;
    }
    if(categoriasSeleccionadasLibro.length === 0){
      setErrorCategoriasSele("Seleccione una categoria");
      hayError = true;
    }
    if(hayError){
      return;
    }


    fetch("http://localhost:8080/libros",{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        titulo: tituloLibro,
        anioPublicacion: parseInt(anioPublicacionLibro),
        autorId: parseInt(autorLibro),
        categoriaIds: categoriasSeleccionadasLibro
      })
    })
    .then(res => res.json())
    .then(data =>{
      console.log("Libro agregado");
    });

  }
  //--------------------------------

  //EDITAR LIBRO----------------------------
  const [libroeditado, setLibroEditado] = useState(null);

  function editarLibro(libro){
    setLibros([]);
    setAgregarLi(true);
    setLibroEditado(libro);
    setTituloLibro(libro.titulo);
    setAnioPublicacionLibro(libro.anioPublicacion);
    setAutorLibro(libro.autorId);
    setCategoriasSeleccionadasLibro(libro.categoriaIds);

    console.log(libro);

    fetch("http://localhost:8080/autores")
      .then(res => res.json())
      .then(data => {
        setListaAutores(data);
      })
    
    fetch("http://localhost:8080/categorias")
      .then(res => res.json())
      .then(data => {
        setListaCategorias(data);
      })


  }
  function actualizarLibro(){

    fetch(`http://localhost:8080/libros/${libroeditado.id}`,{

      method: "PUT",

      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titulo: tituloLibro,
        anioPublicacion: anioPublicacionLibro,
        autorId: autorLibro,
        categoriaIds: categoriasSeleccionadasLibro
      })
    })
    .then(res => res.json())
    .then(data => {

      console.log("Libro Actuailizado!")
      setTituloLibro("");
      setAnioPublicacionLibro("");
      setAutorLibro("");
      setCategoriasSeleccionadasLibro([]);

      mostrarLibros();

      setAgregarLi(false);
    })
  }

  //ELIMINAR LIBRO--------------
  function eliminarLibro(id){

    const confirmar = window.confirm("Seguro que desea eliminar?");

    if(confirmar){

      fetch(`http://localhost:8080/libros/${id}`,{

        method: "DELETE"

      })
      .then(res => res.json())
      .then(data => {
        console.log("Libro Eliminado");
        mostrarLibros();
      })
    }
  }


  return (
    <div>
      <h1 className="T1">Biblioteca</h1>

      {/*BOTONES GENERALES--------*/}
      {/*BOTONES DE AUTORES*/}
      <section >
        <button onClick={mostrarAutores}>Mostrar Autores</button>
        <button onClick={agregarAutores}>Agregar Autores</button>
        
      </section>

      {/*BOTONES DE CATEGORIAS*/}
      <section>
        <button onClick={mostrarCategorias}>Mostrar Categorias</button>
        <button onClick={agregarCategorias}>Agregar Categorias</button>
      </section>

      {/*BOTONES DE LIBROS*/}
      <section>
        <button onClick={mostrarLibros}> Mostrar Libros</button>
        <button onClick={AgregarLibro}>Agregar Libros</button>
      </section>
    
      {/*CONTENIDO DE MOSTRAR----------*/}
      <section>
        {/*MOSTRAR AUTORES*/}
        {
          autores.length > 0 && (
            <table border="1">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Nombre</th>
                  <th>Nacionalidad</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>

              <tbody>
                {
                  autores.map((autor, index) => (
                    
                    <tr key={autor.id}>
                      <td>{index + 1}</td>

                      <td>{autor.nombre}</td>

                      <td>{autor.nacionalidad}</td>

                      <td>
                        <button onClick={() => editarAutor(autor)}>Editar</button>
                      </td>

                      <td>
                        <button onClick={() => eliminarAutor(autor.id)}>Eliminar</button>
                      </td>

                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
        }

        {/*MOSTRAR CATEGORIAS*/}
        {
          categorias.length > 0 && (
            <table border="1">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Categorias</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>

              <tbody>
                {
                  categorias.map((categoria, index) => (
                    <tr key={categoria.id}>
                      
                      <td>{index + 1}</td>

                      <td>{categoria.nombre}</td>

                      <td>
                        <button onClick={() => editarCategoria(categoria)}>Editar</button>
                      </td>

                      <td>
                        <button onClick={() => eliminarCategoria(categoria.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
        }

        {/*MOSTRAR LIBRO*/}
        {
          libros.length > 0 && (
            <table border="1">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Libro</th>
                  <th>Año Publicacion</th>
                  <th>Autor</th>
                  <th>Categorias</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>

              <tbody>
                {
                  libros.map((libro, index) => (
                    <tr key={libro.id}>
                      <td>{index + 1}</td>
                      <td>{libro.titulo}</td>
                      <td>{libro.anioPublicacion}</td>
                      <td>{libro.nombreAutor}</td>
                      <td>{libro.categorias.join(" - ")}</td>         
                      <td>
                        <button onClick={() => editarLibro(libro)}>Editar</button>
                      </td>         
                      <td>
                        <button onClick={() => eliminarLibro(libro.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
        }
      </section>

      {/*CONTENIDO DE AGREGAR----------*/}  

      {/*AGREGAR AUTORES*/}
      <section>
        {agregarAu && 

          <div className="formulario">
            <h3>Agregar Autores</h3>

            <div className="fila">
              <p>Ingrese Nombre: </p>
              <input 
                type="text" 
                placeholder="Ingrese el nombre..." 
                value={nombreAutor} 
                onChange={(e) => setNombreAutor(e.target.value)}
              />
            </div>
            {
              errorAutor && <p className="pErrores">{errorAutor}</p>
            }

            <div className="fila">
              <p>Ingrese Nacionalidad: </p>
              <input 
                type="text" 
                placeholder="Ingrese la nacionalidad..." 
                value={nacionalidadAutor}
                onChange={(e) => setNacionalidadAutor(e.target.value)}                
              />
            </div>
            {
              errorNacionalidad && <p className="pErrores">{errorNacionalidad}</p>
            }
            
            {
              autorEditado ? (
                <button onClick={actualizarAutor}>Actualizar</button>
              ) :(
                <button onClick={guardarAutor}>Agregar</button>
              )
            }
            
          </div>
        }
      </section>

      {/*AGREGAR CATEGORIAS*/}
      <section>
        {
          agregarCat &&
          <div className="formulario">
            <h3>Agregar Categorias</h3>

            <div className="fila">
              <p>Ingrese la cateogira</p>
              <input type="text" 
                placeholder="Escriba su categoria..." 
                value={nombreCategoria}
                onChange={(e) => setNombreCategoria(e.target.value)}                
              />                            
            </div>            
            {
              errorCategoria && <p className="pErrores">{errorCategoria}</p>
            }
            
            {
              categoriaEditado ? (
                <button onClick={actualizarCategoria}>Actualizar</button> 
              ) :(
                <button onClick={guardarCategoria}>Agregar</button>
              )
            }

          </div>
        }
      </section>

      {/*AGREGAR LIBROS*/}
      <section>
        {
          agregarLi &&
          <div className="formulario">
            <h3>Agregar Libro</h3>

            <div className="fila">
              <p>Ingrese Titulo: </p>
              <input type="text" 
              placeholder="Escribir el titulo..."
              value={tituloLibro}
              onChange={(e) => setTituloLibro(e.target.value)}
              />
            </div>
            {
              errorTitulo && <p className="pErrores">{errorTitulo}</p>
            }

            <div className="fila">
              <p>Ingrese el año: </p>
              <input type="number" 
              placeholder="Ejem. 2000, 2003..."
              value={anioPublicacionLibro}
              onChange={(e) => setAnioPublicacionLibro(e.target.value)}
              />              
            </div>
            {
              errorAnio && <p className="pErrores">{errorAnio}</p>
            }

            <div className="fila">
              <p>Seleccione nombre del autor: </p>
              <select 
              value={autorLibro}
              onChange={(e) => setAutorLibro(e.target.value)}>
                <option value="">Seleccione el autor</option>
                {
                  
                  listaAutores.map(autor =>(
                    <option key={autor.id} value={autor.id}>{autor.nombre}</option>
                  ))
                }
              </select>
            </div>
            {
              errorAutorLibro && <p className="pErrores">{errorAutorLibro}</p>
            }

            <div>
              <p>Seleccione las categorias: </p>

              <div className="categorias">
                {
                  listaCategorias.map(categoria =>(
                    <label key={categoria.id}>
                      <input 
                        type="checkbox"
                        value={categoria.id}
                        onChange={manejarCategorias}
                        checked={categoriasSeleccionadasLibro.includes(categoria.id)}
                      />
                      {categoria.nombre}
                    </label>
                  ))
                }
              </div>
              
              {
                errorCategoriasSele && <p className="pErrores">{errorCategoriasSele}</p>
              }

            </div>

            {
              libroeditado ? (
                <button onClick={actualizarLibro}>Actualizar</button>
              ) : (
                <button onClick={guardarLibro}>Agregar</button>
              )
            }

          </div>
        }

      </section>
    </div>
  );
}

export default App;