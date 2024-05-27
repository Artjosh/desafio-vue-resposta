<!-- src/components/IndexComponent.vue -->
<template>
  <div class="container">
    <section class="settings">
      <ul class="nav nav-pills" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" data-bs-toggle="pill" data-bs-target="#settings">
            Exibição
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" data-bs-toggle="pill" data-bs-target="#custom">
            Customização
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" data-bs-toggle="pill" data-bs-target="#actions">
            Ação
          </button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="settings">
          <div class="inputs cScroll">
            <div class="input">
              <label>Titulo</label>
              <input ref="change_title" type="text" placeholder="Ex: Novo Template" />
              <small> Identificação da tag internamente no sistema </small>
            </div>
            <hr />
            <div class="input">
              <label>Tipo</label>
              <select ref="type">
                <option value="text" selected>Texto</option>
                <option value="image">Imagem</option>
                <option value="icon">Icone</option>
                <option value="text_icon">Icone e Texto</option>
              </select>
            </div>
            <div class="input" ref="icon" data-field="change_icon">
              <label>Ícone</label>
              <select>
                <option :value="icon.value" v-for="icon in state.icons" :key="icon.value">
                  {{ icon.name }}
                </option>
              </select>
            </div>
            <div class="input" data-field="change_text">
              <div class="label-button-container">
                <label>Texto da Tag</label>
              </div>
              <div contenteditable="true" style="border: 1px black solid" ref="texto_da_tag">Exemplo</div>
            </div>
            <div class="input file" data-field="change_image" ref="change_image">
              <div>
                <span id="selected_image" class="hidden">
                  <div ref="exclude_image" @click="removeImage">
                    <i class="bx bx-trash"></i>
                  </div>
                  <img :src="state.image" alt="app" class="hidden" />
                </span>
                <label for="change_image">
                  <input :id="'change_image'" type="file" @change="handleImageChange" />
                  <i class="bx bx-images"></i>
                </label>
                <ul>
                  <li>
                    <strong>Tamanho Recomendado:</strong>
                    200x200
                  </li>
                  <li>
                    <strong>Formatos Aceitos:</strong>
                    png, jpg, gif e jpeg
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="custom">
          <div class="inputs cScroll">
            <div class="input">
              <label>Posição da Tag</label>
              <select ref="position_tag">
                <option value="insideImage" selected>Dentro da Imagem</option>
                <option value="beforeImage">Acima da Imagem</option>
                <option value="beforeTitle">Acima do titulo</option>
                <option value="afterPrice">Após o preço</option>
                <option value="afterBuy">Após o botão de compra</option>
              </select>
            </div>
            <div class="input" :data-field="'change_radius'">
              <label>Arredondamento</label>
              <select ref="rounded">
                <option value="4px" selected>Pouco Arredondado</option>
                <option value="30px">Muito Arredondado</option>
                <option value="0">Quadrado</option>
              </select>
            </div>
            <div class="input" :data-field="'change_width'">
              <label>Tamanho da Tag</label>
              <select ref="width">
                <option value="fit-content" selected>Mínimo Possível</option>
                <option value="100%">Máximo Possível</option>
              </select>
            </div>
            <hr />
            <div class="input">
              <label>Tipo da Borda</label>
              <select ref="border_type" data-type="borderStyle">
                <option value="none" selected>Nenhuma</option>
                <option value="solid">Sólida</option>
                <option value="dashed">Tracejada</option>
                <option value="dotted">Pontilhada</option>
              </select>
            </div>
            <div class="input" ref="border_width" data-type="borderWidth">
              <span class="input-title">
                <label>Espessura da borda</label>
                <small>1</small>
              </span>
              <input type="range" min="1" max="6" value="1" />
            </div>
            <hr />
            <hr />
            <div class="input" ref="fontSize">
              <span class="input-title">
                <label>Tamanho da Fonte</label>
                <small>13</small>
              </span>
              <input type="range" min="8" max="32" value="11" />
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="actions">
          <div class="inputs cScroll">
            <div class="input" ref="action">
              <label>Ação</label>
              <select v-model="state.action">
                <option :value="value" v-for="{ name, value } in state.actions" :key="value">
                  {{ name }}
                </option>
              </select>
            </div>
            <div class="input" data-action="whatsapp" ref="action_phone">
              <label>Número do Whatsapp</label>
              <input type="text" placeholder="Ex: 73 99999-9999" v-mask="['(##) ####-####', '(##) #####-####']" />
            </div>
            <div class="input" data-action="whatsapp" ref="action_phone_message">
              <label>Texto da Mensagem</label>
              <input type="text" placeholder="Ex: Poderia me informar sobre o produto?" />
            </div>
            <div class="input" data-action="openPage" ref="action_link" data-field="input">
              <label>Link da Página</label>
              <input type="text" placeholder="Ex: site.com" />
            </div>
            <div class="alert" v-if="getDescription(state.action, state.actions)">
              {{ getDescription(state.action, state.actions) }}
            </div>
            <hr />
            <div class="input" ref="only" data-field="select">
              <label>Filtrar Visitantes</label>
              <select v-model="state.only">
                <option :value="value" v-for="{ name, value } in state.visitors" :key="value">
                  {{ name }}
                </option>
              </select>
            </div>
            <div class="alert" v-if="getDescription(state.only, state.visitors)">
              {{ getDescription(state.only, state.visitors) }}
            </div>
            <hr />
            <div class="input" ref="stock" data-field="select">
              <label>Filtrar Estoque</label>
              <select v-model="state.stock">
                <option :value="value" v-for="{ name, value } in state.stockOptions" :key="value">
                  {{ name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <button class="salvar" ref="salvar_template">Salvar Tag</button>
    </section>
    <section class="product">
      <div ref="product">
        <span :data-store="'product-item-image'">
          <div class="image-container">
            <button class="dropdown-button" v-if="windowWidth <= 760" @click="toggleDropdown">←</button>
            <img :src="defaultImage" alt="produto" class="responsive-image" />
            <div ref="tag_container" class="grid-container">
              <img ref="tag_image" :src="logoApp" alt="app" class="tag" style="grid-area: 2/2;" />
            </div>
          </div>
          <div class="selection-buttons" v-if="windowWidth > 760">
            <div class="input" ref="background_color" data-type="backgroundColor">
              <label>Cor do Fundo</label>
              <div class="input-picker">
                <input class="coloris" value="#f0f0f0" />
              </div>
            </div>
            <div class="input" ref="text_color" data-type="color">
              <label>Cor do Texto</label>
              <div class="input-picker">
                <input class="coloris" value="#000000" />
              </div>
            </div>
            <div class="input" ref="icon_color" data-type="fill" data-field="icon_color">
              <label>Cor do Ícone</label>
              <div class="input-picker">
                <input class="coloris" value="#000000" />
              </div>
            </div>
            <div class="input" ref="border_color" data-type="borderColor">
              <label>Cor da Borda</label>
              <div class="input-picker">
                <input class="coloris" value="#000000" />
              </div>
            </div>
            <div class="input align" ref="align_horizontal">
              <label>Alinhamento Horizontal</label>
              <ul>
                <li @click="moveImageHorizontally('left')" :class="{ active: state.align_horizontal === 'flex-start' }">
                  <i class="bx bx-align-left"></i>
                </li>
                <li @click="changeAlign('center', 'align_horizontal')" :class="{ active: state.align_horizontal === 'center' }">
                  <i class="bx bx-align-middle"></i>
                </li>
                <li @click="moveImageHorizontally('right')" :class="{ active: state.align_horizontal === 'flex-end' }">
                  <i class="bx bx-align-right"></i>
                </li>
              </ul>
            </div>
            <div class="input align vertical-align" ref="align_vertical">
              <label>Alinhamento Vertical</label>
              <ul>
                <li @click="moveImageVertically('up')" :class="{ active: state.align_vertical === 'flex-start' }">
                  <i class="bx bx-vertical-top"></i>
                </li>
                <li @click="changeAlign('center', 'align_vertical')" :class="{ active: state.align_vertical === 'center' }">
                  <i class="bx bx-reflect-horizontal"></i>
                </li>
                <li @click="moveImageVertically('down')" :class="{ active: state.align_vertical === 'flex-end' }">
                  <i class="bx bx-vertical-bottom"></i>
                </li>
              </ul>
            </div>
          </div>
          <div class="dropdown-menu" :class="{ show: dropdownVisible }">
            <div class="dropdown-content">
              <button class="close-button" @click="toggleDropdown">X</button>
              <div class="input" ref="background_color" data-type="backgroundColor">
                <label>Cor do Fundo</label>
                <div class="input-picker">
                  <input class="coloris" value="#f0f0f0" />
                </div>
              </div>
              <div class="input" ref="text_color" data-type="color">
                <label>Cor do Texto</label>
                <div class="input-picker">
                  <input class="coloris" value="#000000" />
                </div>
              </div>
              <div class="input" ref="icon_color" data-type="fill" data-field="icon_color">
                <label>Cor do Ícone</label>
                <div class="input-picker">
                  <input class="coloris" value="#000000" />
                </div>
              </div>
              <div class="input" ref="border_color" data-type="borderColor">
                <label>Cor da Borda</label>
                <div class="input-picker">
                  <input class="coloris" value="#000000" />
                </div>
              </div>
              <div class="input align" ref="align_horizontal">
                <label>Alinhamento Horizontal</label>
                <ul>
                  <li @click="moveImageHorizontally('left')" :class="{ active: state.align_horizontal === 'flex-start' }">
                    <i class="bx bx-align-left"></i>
                  </li>
                  <li @click="changeAlign('center', 'align_horizontal')" :class="{ active: state.align_horizontal === 'center' }">
                    <i class="bx bx-align-middle"></i>
                  </li>
                  <li @click="moveImageHorizontally('right')" :class="{ active: state.align_horizontal === 'flex-end' }">
                    <i class="bx bx-align-right"></i>
                  </li>
                </ul>
              </div>
              <div class="input align vertical-align" ref="align_vertical">
                <label>Alinhamento Vertical</label>
                <ul>
                  <li @click="moveImageVertically('up')" :class="{ active: state.align_vertical === 'flex-start' }">
                    <i class="bx bx-vertical-top"></i>
                  </li>
                  <li @click="changeAlign('center', 'align_vertical')" :class="{ active: state.align_vertical === 'center' }">
                    <i class="bx bx-reflect-horizontal"></i>
                  </li>
                  <li @click="moveImageVertically('down')" :class="{ active: state.align_vertical === 'flex-end' }">
                    <i class="bx bx-vertical-bottom"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </span>
        <div class="description" :data-store="'product-item-info'">
          <p>Camiseta Preta longa</p>
          <strong>R$ 23,00</strong>
        </div>
        <div class="pay">
          <button>Comprar</button>
          <button>Espiar</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { inject, ref, reactive, onMounted, onBeforeUnmount, getCurrentInstance } from "vue";
import { InitCustom } from "../scripts/index";
import "@melloware/coloris/dist/coloris.css";
import Coloris from "@melloware/coloris";

import defaultImage from '../assets/camisa.png';
import logoApp from '../assets/logo.png';

const toast = inject("moshaToast");
const swal = inject("$swal");

const state = reactive({
  loading: false,
  action: "none",
  only: "all",
  stock: "ever",
  tag: [],
  align_horizontal: 'center',
  align_vertical: 'center', 
  icons: [
    { name: "Ícone 1", value: "icon-1" },
    { name: "Ícone 2", value: "icon-2" },
  ],
  actions: [
    { name: "Nenhuma", value: "none" },
    { name: "Abrir Página", value: "openPage" },
    { name: "WhatsApp", value: "whatsapp" },
  ],
  visitors: [
    { name: "Todos", value: "all" },
    { name: "Novos Visitantes", value: "new" },
  ],
  stockOptions: [
    { name: "Sempre", value: "ever" },
    { name: "Quando Disponível", value: "available" },
  ],
  image: defaultImage,
});

window.logo_app = logoApp;

const dropdownVisible = ref(false);
const windowWidth = ref(window.innerWidth);

function toggleDropdown() {
  dropdownVisible.value = !dropdownVisible.value;
  console.log("Dropdown visibility:", dropdownVisible.value);
}

function updateWindowWidth() {
  windowWidth.value = window.innerWidth;
}

window.addEventListener('resize', updateWindowWidth);

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth);
});

function getDescription(action, type) {
  return type?.find(({ value }) => value === action)?.["description"] || "";
}

function handleImageChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      state.image = e.target.result;
      const img = document.querySelector('#selected_image img');
      img.src = state.image;
      document.querySelector('#selected_image').classList.remove('hidden');
      
      // Atualiza a imagem da tag
      const tagImage = getCurrentInstance().refs.tag_image;
      tagImage.src = state.image;
    };
    reader.readAsDataURL(file);
  }
}


function changeAlign(value, ref) {
  state[ref] = value;

  const tagImage = getCurrentInstance().refs.tag_image;
  const gridPositions = {
    'flex-start': '1 / 2',
    'center': '7 / 8', // Centralizado em um grid 13x13
    'flex-end': '13 / 14'
  };

  if (ref === 'align_horizontal') {
    tagImage.style.gridColumn = gridPositions[value];
  }

  if (ref === 'align_vertical') {
    tagImage.style.gridRow = gridPositions[value];
  }
}

function moveImageHorizontally(direction) {
  const tagImage = getCurrentInstance().refs.tag_image;
  let currentColumn = parseInt(tagImage.style.gridColumnStart);
  if (direction === 'left' && currentColumn > 1) {
    currentColumn -= 1;
  } else if (direction === 'right' && currentColumn < 13) {
    currentColumn += 1;
  }
  tagImage.style.gridColumn = `${currentColumn} / ${currentColumn + 1}`;
}

function moveImageVertically(direction) {
  const tagImage = getCurrentInstance().refs.tag_image;
  let currentRow = parseInt(tagImage.style.gridRowStart);
  if (direction === 'up' && currentRow > 1) {
    currentRow -= 1;
  } else if (direction === 'down' && currentRow < 13) {
    currentRow += 1;
  }
  tagImage.style.gridRow = `${currentRow} / ${currentRow + 1}`;
}

onMounted(() => {
  const { refs } = getCurrentInstance();
  const custom = new InitCustom(refs, 'type', toast, state, swal);

  Coloris.init();
  Coloris({
    el: ".coloris",
    theme: "pill",
    themeMode: "dark",
    formatToggle: true,
    closeButton: true,
    closeLabel: "Fechar",
  });

  custom.init();
});
</script>

<style scoped>
.product span {
  display: flex;
  justify-content: center;
  position: relative;
}


@media (min-width: 761px) {
  .product span {
    justify-content: center;
    flex-direction: row;
  }

  .selection-buttons {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }

  .selection-buttons .input {
    margin-bottom: 10px;
  }

  .dropdown-button {
    display: none;
  }
  .dropdown-menu .dropdown-content{
    display: none;
  }
  .dropdown-menu.show{
    display: none;
  }
}

@media (max-width: 760px) {
  .selection-buttons {
    display: none;
  }
  
  .vertical-align ul {
    display: flex;
    flex-direction: column; /* Alinha os itens na vertical */
    list-style-type: none;
    padding: 0;
    width: 10px;
    height: 150px;
    margin-left: 40%;
  }

  .vertical-align ul li {
    flex: 1;
    text-align: center;
    cursor: pointer;
    padding: 10px;
    border: 1px solid #ddd;
    margin-bottom: 5px; /* Espaçamento entre os botões */
  }

  .vertical-align ul li:last-child {
    margin-bottom: 0; /* Remove o espaçamento após o último item */
  }

  .vertical-align ul li.active {
    background-color: #007bff;
    color: white;
  }

  .dropdown-button {
    display: flex;
    position: absolute;
    right: 10px;
    z-index: 10;
    border: none;
    align-items: center;
    justify-content: center;
    width: 40px;
    color: yellow;
    height: 50px;
    font-size: xx-large;
    border-radius: 20%;
    background-color: red;
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    top: 0;
    background: transparent;
    right: -20px;
    border: none;
    padding: 0px; /* Ajuste o padding conforme necessário */
    z-index: 20;
    width: 120px; /* Ajuste a largura conforme necessário */
    max-width: 120px; /* Define um máximo para a largura */
    box-sizing: border-box; /* Garantir que padding e borda sejam incluídos na largura total */
    height: 100%;
  }

  .dropdown-menu.show {
    display: block;
  }

  .dropdown-menu .clr-picker{
    right: 10px;
  }

  .dropdown-content {
    background: rgba(0, 0, 0, 0.35); /* Fundo branco com 10% de opacidade */
    backdrop-filter: blur(4px); /* Aplicando o desfoque */
    display: flex;
    color: yellow;
    font-weight: bold;
    flex-direction: column;
    transform: scale(0.7); /* Reduz o tamanho do conteúdo para 90% */
    transform-origin: top right; /* Mantém o ponto de origem no topo direito */
  }

  .close-button {
    left: 60px;
    top: -20px;
    align-self: flex-end;
    position: absolute;
    cursor: pointer;
    background-color: transparent;
    border: none;
    font-size: 1.2rem;
    font-weight: bold;
    color: yellow;
  }

  .close-button:hover {
    color: black; /* Cor ao passar o mouse */
  }

  .close-button:focus {
    outline: none; /* Remove o contorno ao focar */
  }
}

.tab-content{
  border: 1px solid gray;
}

.salvar {
  border: 1px  solid gray
}

.container {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  font-family: Arial, sans-serif;
  text-align: center;
}

input, select, button {
  display: block;
  margin: 10px auto;
  padding: 10px;
  width: 100%;
  max-width: 300px;
}

input[type="file"] {
  padding: 0;
}

input[type="range"] {
  width: 100%;
}

.label {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-pills .nav-link.active {
  background-color: #007bff;
}

.nav-pills .nav-link {
  margin-right: 5px;
}

.tab-pane {
  padding: 10px;
}

.hidden {
  display: none;
}

.img-thumbnail {
  max-width: 200px;
  margin: 10px 0;
}

.align ul {
  display: flex;
  list-style-type: none;
  padding: 0;
}

.align ul li {
  flex: 1;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ddd;
}

.align ul li.active {
  background-color: #007bff;
  color: white;
}

.input.file {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#selected_image {
  display: block;
  margin-bottom: 10px;
}

#selected_image img {
  max-width: 100%;
}

#change_image {
  display: block;
}

.image-container {
  position: relative;
  width: 100%;
  height: auto; /* Ajuste para altura automática */
  max-height: 567px;
  max-width: 444px;
}

.responsive-image {
  width: 100%;
  max-height: 567px;
  max-width: 444px;
  height: auto; /* Ajuste para altura automática */
  object-fit: contain; /* Ajusta a imagem para caber dentro do contêiner sem distorção */
}
.grid-container {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(13, 1fr); /* Tamanho fixo para cada coluna */
  grid-template-rows: repeat(13, 1fr); /* Tamanho fixo para cada linha */
  width: 100%;
  height: 100%;
  pointer-events: none; /* Faz com que a grade não interfira nas interações com a imagem */
}

.grid-container .tag {
  width: 34.1px; 
  height: 43.6px; 
  object-fit: contain; 
}

.tag {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Redimensiona a tag para caber dentro do grid item */
}
</style>
