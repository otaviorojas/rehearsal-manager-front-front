import {NAME_WEEK_DAY, DAY} from "./constants/TagNames";

export default class FilterBean {
  constructor({
    searchName = "",
    domingo = { isActive: false, tagName: NAME_WEEK_DAY },
    sabado = { isActive: false, tagName: NAME_WEEK_DAY },
    primeiro = { isActive: false, tagName: DAY },
    segundo = { isActive: false, tagName: DAY },
    terceiro = { isActive: false, tagName: DAY },
    quarto = { isActive: false, tagName: DAY },
    ultimo = { isActive: false, tagName: DAY },
  } = {}) {
    this.searchName = searchName;
    this.domingo = domingo;
    this.sabado = sabado;
    this.primeiro = primeiro;
    this.segundo = segundo;
    this.terceiro = terceiro;
    this.quarto = quarto;
    this.ultimo = ultimo;
  }
}
