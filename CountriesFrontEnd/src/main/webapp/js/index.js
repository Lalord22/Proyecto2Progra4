var backend="http://localhost:8080/CountriesBackEnd/api";

function listar(cs){
    l=document.getElementById('lista');
    l.innerHTML='';
    cs.forEach( p=>renderPais(p,l));
};

function renderPais(c,lista){
    cldiv=document.createElement("div"); // Country Left Div
    cldiv.className="cldiv";

    clp=document.createElement("p");
    clp.appendChild(document.createTextNode(c.name));
    clp.className="clp";

    climg= document.createElement("img");
    climg.setAttribute("src",c.flag);
    climg.className="climg";

    cldiv.append(clp,climg);

    crdiv=document.createElement("div");  //Country Right Div
    crdiv.className="crdiv";
    crdiv.innerHTML=`
            Capital: ${c.capital}<br>
            Población: ${c.population}<br>
            Area: ${c.area}<br>
            Latitud: ${c.latlng[0]}<br>
            longitud: ${c.latlng[1]}
            `;

    cdiv=document.createElement("div"); // Country Div
    cdiv.className="cdiv";        
    cdiv.append(cldiv,crdiv);  

    lista.appendChild(cdiv);
}

async function cargar(){
    let request = new Request(`${backend}/countries`, {method: 'GET', headers: { }});
    let response = await fetch(request);
    if (!response.ok) {errorMessage(response.status);return;}
    let countries = await response.json();  
    listar(countries); 
}

async function bucar(){
    var nombre=document.getElementById('nombre').value;
    let request = new Request(`${backend}/countries?name=${nombre}`, {method: 'GET', headers: { }});  
    let response = await fetch(request);
    if (!response.ok) {errorMessage(response.status);return;}
    let countries = await response.json();  
    listar(countries); 
}

function errorMessage(status,place){  
    switch(status){
        case 404: error= "Información no encontrada"; break;
        default:  error= "Ha ocurrido un error";  
    };            
    alert(error);
} 

 function loaded(){
    document.getElementById('buscar').addEventListener('click', e=>bucar() );
    cargar();
 }
 
 document.addEventListener("DOMContentLoaded",loaded); 




