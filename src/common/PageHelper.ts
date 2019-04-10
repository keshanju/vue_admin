import DevExpress from "devextreme/bundles/dx.all";
import Enumerable from "linq";

/**
 * 分页带 聚合封装
 */
export class PageHelper {
  public static List(url: string) {
    let ds = {
      load: (loadOptions: DevExpress.data.LoadOptions) => {
        let strWhere = "";
        let strFilter = "";
        //检索
        if (loadOptions.filter != null) {
          let filterArr: Array<any> = loadOptions.filter;
          if (filterArr[1] == "and") {
            let index = 0;
            for (const ff of filterArr) {
              let ss = index % 2;
              if (ss == 0) {
                let condition = "";
                switch (ff[1]) {
                  case "=":
                    condition = "equal";
                    break;
                  case "contains":
                    condition = "contain";
                    break;
                }
                strFilter += ff[0] + "__" + condition + "__" + ff[2] + "|";
              }
              index++;
            }
          } else {
            let condition = "";
            switch (filterArr[1]) {
              case "=":
                condition = "equal";
                break;
              case "contains":
                condition = "contain";
                break;
            }
            strFilter += filterArr[0] + "__" + condition + "__" + filterArr[2];
          }
          strWhere += "&search=" + strFilter;
        }

        //排序
        if (loadOptions.sort != null) {
          let sortArr: any = loadOptions.sort[0];
          let desc = "desc";
          if (!sortArr.desc) {
            desc = "asc";
          }
          strWhere += "&sort=" + sortArr.selector + "__" + desc;
        }

        console.log(loadOptions);

        let tempPageIndex = Math.floor(loadOptions.skip / loadOptions.take) + 1;
        let pageIndex: number = tempPageIndex;
        let pageSize: number = loadOptions.take;

        let page_args = `&size=${pageSize}&page=${pageIndex}`;
        let d = $.Deferred();
        $.getJSON(`${url}${page_args}${strWhere}`).done(result => {
          let list = result.data.list;
          let total_summary = [];
          // for (const row of loadOptions.totalSummary) {
           
          //   // if (row.summaryType == "sum") {
          //   //   let oo = ll.sum(p => p.online_users);
          //   //   // total_summary.push(oo);
          //   // }
          // }
          let ll = Enumerable.from(list).sum(p => {
            let pp = p as any;
            return pp["online_users"];
          });
          total_summary.push(ll);
          console.log(total_summary);
          //Enumerable.from(list).sum(p=>p.key==)
          d.resolve({
            data: list,
            totalCount: result.data.total,
            summary: total_summary
          });
        });
        return d.promise();
      }
    };
    return ds;
  }
}
