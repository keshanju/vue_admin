import { shallowMount } from "@vue/test-utils";
import Enumerable from "linq";
import { DateTimeUtils } from "@/utils/DateTimeUtils";

it("sdfsdf", () => {
  //debugger;
  //   let a = Enumerable.from([1, 2, 3, 4]).sum();
  //   console.log(a);

  //   let b = Enumerable.from([1, 2, 3, 4]).firstOrDefault(p => p == 3);

  //   let c = Enumerable.from([1, 2, 3, 4]).forEach(p => {
  //     console.log(p);
  //   });

  //   let d = Enumerable.from([{ name: "xx" }, { name: "bbb" }]).firstOrDefault(
  //     p => p.name == "bbb"
  //   );
  let billing_type = 1;
  let expired_time = "2019-01-22 05:46:25";
  let user_earn_minutes = 40244;
  let last_pause_time = "2018-12-25 02:38:26";
  let pause_status = 1;
  //计算到期时间
  let now = DateTimeUtils.getNow();
  let time_diff = 0;
  let esc_time = "";
  if (billing_type == 1) {
    time_diff =
      DateTimeUtils.parserDate(expired_time).getTime() -
      DateTimeUtils.parserDate(now).getTime();

    if (pause_status == 1) {
      let tt_diff =
        DateTimeUtils.parserDate(now).getTime() -
        DateTimeUtils.parserDate(last_pause_time).getTime();
      time_diff = time_diff + tt_diff;
    }

    time_diff = time_diff + user_earn_minutes * 60 * 1000;
    esc_time = DateTimeUtils.TimeIntegrate2(time_diff); // DateTimeUtils.AddTime(now, DateTimeEnum.Milliscond, time_diff);
  }
  console.log(esc_time);
});

it("test_time", () => {
  let xx = 19875002 * 1000;
  let aa = DateTimeUtils.TimeIntegrate2(xx);
  console.log(aa);
});

it("test_null", () => {
  let a = !null;
  console.log(a);
});
