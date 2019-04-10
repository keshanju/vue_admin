import { LangResourcesApi } from "@/api/LangResourcesApi";
import { LangResourcesModel } from "@/models/LangResourcesModel";

export class LangUtils {
  private static langResourcesApi = new LangResourcesApi();

  /**
   * 获取语言字典列表
   */
  public static async getLangResourceList() {
    let d = await this.langResourcesApi.getList();
    let lang = [];
    for (const ii of d.data) {
      lang.push(ii.title);
    }
    lang = ["选择语言字典", ...lang];
    return lang;
  }

  public static async getLangResourceDic() {
    let d = await this.langResourcesApi.getList();
    return d.data;
  }

  /**
   * 根据langId获取标题  没有原样返回
   * @param langId
   */
  public static async getLangResourceTitle(
    dsLang: LangResourcesModel[],
    langId: string
  ) {
    //console.log(dsLang);
    try {
      let temp = langId;
      if (dsLang) {
        for (const item of dsLang) {
          if ("lang_" + item.id == langId) {
            temp = item.title;
          }
        }
      }
      return temp;
    } catch (error) {
        console.log(error);
    }
    return langId;
  }

  /**
   * 根据标题获取LangId 没有原样返回
   * @param title
   */
  public static async getLangResourceId(
    dsLang: LangResourcesModel[],
    title: string
  ) {
    let temp = title;
    for (const item of dsLang) {
      if (item.title == title) {
        temp = "lang_" + item.id;
      }
    }
    return temp;
  }
}
