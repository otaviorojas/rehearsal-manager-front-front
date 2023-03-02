import {NAME_WEEK_DAY, DAY, CITY} from "./constants/TagNames";

export default class FilterBean {
  constructor({
    searchName = "",
    osasco = { isActive: false, tagName: CITY },
    carapicuiba = { isActive: false, tagName: CITY },
    domingo = { isActive: false, tagName: NAME_WEEK_DAY },
    sabado = { isActive: false, tagName: NAME_WEEK_DAY },
    primeiro = { isActive: false, tagName: DAY },
    segundo = { isActive: false, tagName: DAY },
    terceiro = { isActive: false, tagName: DAY },
    quarto = { isActive: false, tagName: DAY },
    ultimo = { isActive: false, tagName: DAY },
  } = {}) {
    this.searchName = searchName;
    this.osasco = osasco;
    this.carapicuiba = carapicuiba;
    this.domingo = domingo;
    this.sabado = sabado;
    this.primeiro = primeiro;
    this.segundo = segundo;
    this.terceiro = terceiro;
    this.quarto = quarto;
    this.ultimo = ultimo;
  }
}
