const listaCursos = document.getElementById("listaCursos")
const form = document.getElementById("formCurso")
const progresso = document.getElementById("barraProgresso")
let contadorMatriculas = 0

const imagens = {
  "Programação":"https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  "Marketing":"https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  "Design":"https://images.unsplash.com/photo-1545235617-9465d2a55698"
}

let cursos = [
  {nome:"Curso HTML", categoria:"Programação", matriculado:false},
  {nome:"Curso CSS", categoria:"Programação", matriculado:false},
  {nome:"Curso JavaScript", categoria:"Programação", matriculado:false},
  {nome:"Marketing Digital", categoria:"Marketing", matriculado:false},
  {nome:"SEO", categoria:"Marketing", matriculado:false},
  {nome:"Redes Sociais", categoria:"Marketing", matriculado:false},
  {nome:"Design Gráfico", categoria:"Design", matriculado:false},
  {nome:"UX/UI", categoria:"Design", matriculado:false},
  {nome:"Illustrator", categoria:"Design", matriculado:false}
]

setTimeout(() => {
  document.getElementById("loading").style.display="none"
  renderCursos()
}, 1500)

form.addEventListener("submit", function(e){
  e.preventDefault()
  const nome = document.getElementById("nomeCurso").value
  const categoria = document.getElementById("categoriaCurso").value
  const curso = {nome, categoria, matriculado:false}
  cursos.push(curso)
  renderCursos()
  form.reset()
  mostrarToast("Curso adicionado com sucesso!")
})

function renderCursos(){
  listaCursos.innerHTML=""
  cursos.forEach((curso,index)=>{
    listaCursos.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${imagens[curso.categoria]}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${curso.nome}</h5>
            <p>${curso.categoria}</p>
            <button class="btn btn-info mb-2" data-bs-toggle="collapse" data-bs-target="#det${index}">Detalhes</button>
            <button class="btn btn-success mb-2" ${curso.matriculado ? "disabled" : ""} onclick="matricularCurso(${index}, this)">
              ${curso.matriculado ? "Matriculado" : "Matricular-se"}
            </button>
            <button class="btn btn-danger mb-2" onclick="removerCurso(${index})">Excluir</button>
            <div class="collapse" id="det${index}">
              <p>Curso completo de ${curso.categoria} com materiais e certificado.</p>
            </div>
          </div>
        </div>
      </div>
    `
  })
  atualizarProgresso()
  atualizarContador()
}

function matricularCurso(index, btn){
  cursos[index].matriculado = true
  contadorMatriculas++
  btn.innerText = "Matriculado"
  btn.disabled = true
  mostrarToast(`Você se matriculou no curso: ${cursos[index].nome}`)
  atualizarContador()
}

function removerCurso(index){
  if(cursos[index].matriculado) contadorMatriculas--
  cursos.splice(index,1)
  renderCursos()
  mostrarToast("Curso removido!")
}

function atualizarProgresso(){
  let porcentagem = cursos.length * 11
  if(porcentagem > 100) porcentagem = 100
  progresso.style.width = porcentagem+"%"
  progresso.innerText = porcentagem+"%"
}

function atualizarContador(){
  let section = document.getElementById("estatisticas")
  let contadorEl = document.getElementById("contadorMatriculas")
  if(!contadorEl){
    let p = document.createElement("p")
    p.id = "contadorMatriculas"
    p.className = "mt-2"
    section.appendChild(p)
    contadorEl = p
  }
  contadorEl.innerText = `Cursos matriculados: ${contadorMatriculas}`
}

function mostrarToast(msg){
  document.getElementById("toastTexto").innerText = msg
  let toast = new bootstrap.Toast(document.getElementById("toastMsg"))
  toast.show()
}