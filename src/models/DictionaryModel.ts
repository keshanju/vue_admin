import * as lsModel from '@/models/BaseModel'

/**
 * 字典模型
 */
export interface DictionaryModel {
    /**
     * Id
     */
    id?: number
    /**
     * 名称
     */
    name?: string
}

/**
 * 字段列表返回
 */
export interface DictionaryListResult extends lsModel.BaseModel {
    data: {
        /**
         * 用户性别 0保密 1帅哥 2美女
         */
        user_sex: Array<DictionaryModel>
        /**
         * 状态   正常 1 关闭 0
         */
        status: Array<DictionaryModel>
        /**
         * 状态  是1 否0
         */
        flag: Array<DictionaryModel>
        /**
         * 有效状态 有效1 无效0
         */
        valid: DictionaryModel[]
        /**
         * 价格类型 1人民币 2美元 3欧元
         */
        price_type: Array<DictionaryModel>

        /**
         * 是否允许 1允许 0不允许
         */
        authority: Array<DictionaryModel>

        /**
         * 通讯方式 1 QQ 2 msn 3 微信
         */
        mobile_contact_type: Array<DictionaryModel>

        /**
         * 卡导入 导出  0未导出 1已导出
         */
        card_is_export: Array<DictionaryModel>
        /**
         * 导出来源 0未导出 1系统员工导出 2代理商导出
         */
        export_source: Array<DictionaryModel>

        /**
         * 计费类型 1时长计费 2过期时间计费 3网吧计费
         */

        billing_type: Array<DictionaryModel>

        /**
         * 充值卡来源 0未充值 1网站
         */
        card_charge_source: Array<DictionaryModel>

        /**
         * 用户状态 0正常 1无效 2锁定
         */
        user_status: Array<DictionaryModel>

        /**
         * 用户验证类型 1不需要验证 2手机验证 3邮箱验证
         */
        user_ver_type: Array<DictionaryModel>

        /**
         * 用户暂停状态 1未暂停 2暂停中
         */
        user_pause_status: Array<DictionaryModel>
        /**
         * 用户注册来源 1国内网站注册 2海外网站注册 3后台添加
         */
        user_from: Array<DictionaryModel>
        /**
         * 语言 0中文 1英文
         */
        user_lang: Array<DictionaryModel>
        /**
         * 用户级别 0超级会员
         */
        user_vip_level: Array<DictionaryModel>
        /**
         * 用户组注册状态 0关闭 1注册
         */
        group_is_reg: Array<DictionaryModel>
        /**
         * App平台 1PC 2安卓 3苹果 4 Mac
         */
        app_platform_type: Array<DictionaryModel>

        /**
         * 订单类型 1新开订单 2续费订单
         */
        invoice_type: DictionaryModel[]
        /**
         * 订单状态 0未处理 1已完成 2未处理 4超时取消 5退款
         */
        invoice_status: DictionaryModel[]
        /**
         * 订单支付状态 0未支付 1注册赠送
         */
        invoice_payment_type: DictionaryModel[]
        /**
         * 订单处理状态 0未处理 1自动处理 2手动处理
         */
        invoice_process_type: DictionaryModel[]
        /**
         * 订单交易状态 0 未处理 1成功 2失败
         */
        invoice_transaction_status: DictionaryModel[]
        /**
         * 用户分库
         */
        user_db_type: DictionaryModel[]
        /**
         * 操作时间来源
         * 0 暂停恢复 1 后台赠送 2账号注册 3充值卡充值 4 购买套餐 5套餐赠送
         */
        duration_option_source: DictionaryModel[]
        /**
         * 持续日期类型 1 月 2分钟
         */
        duration_date_type: DictionaryModel[]
        /**
         * 持续时间类型  0过期时间 1赢取时间
         */
        duration_time_option: DictionaryModel[]
        /**
         * 全局设置类型  1 后台全局设置
         */
        setting_type: DictionaryModel[]
        /**
         * 服务器类型 0S5 1VPN
         */
        server_type: DictionaryModel[]
        /**
         * 线路级别 0电信 1联通 2移动
         */
        line_type: DictionaryModel[]
        /**
         * 线路等级 0 默认等级
         */
        line_level: DictionaryModel[]
        /**
         * 线路故障 状态 0 正常 1异常
         */
        line_fault_status: DictionaryModel[]
        /**
         * 游戏区服 1 国服 0 外服
         */
        game_area: DictionaryModel[]
        /**
         * 审核来源
         */
        appeal_source: DictionaryModel[]

        /**
         * 审核状态 0待审核 1通过 2不通过
         */
        appeal_status: Array<DictionaryModel>

        /**
         * 客户端退出类型  0正常退出
         */
        client_logout_type: DictionaryModel[]
        /**
         * 客户端登录设备类型 0 未知类型
         */
        client_login_device_type: Array<DictionaryModel>
        /**
         * 客户操作类型 0 Windows 1Mac OS X 2 iOS
         */
        client_os_type: Array<DictionaryModel>
        /**
         * 退款状态 0 未退款 1已退款
         */
        //refund_status: Array<DictionaryModel>;
        /**
         * 渠道来源类型 0 联想
         */
        user_oem_type: Array<DictionaryModel>

        /**
         * 用户类型 0 普通用户 1网吧用户 2主播用户
         */
        user_type: Array<DictionaryModel>

        /**
         * 公告分类   0:默认分类
         */
        class_type: DictionaryModel[]

        /**
         * 支持类型 0:所有类型 1:PC 2:移动端
         */
        support_type: DictionaryModel[]

        /**
         * 发布状态  0:草稿 1:发布
         */
        publish_status: DictionaryModel[]
        /**
         * 活动类型
         */
        activity_type: DictionaryModel[]

        /**
         * 员工等级 0普通员工 10部门主管  20部门经理
         */
        staff_level: DictionaryModel[]

        /**
         * 加速状态 0停止 1加速中
         */
        speed_status: DictionaryModel[]

        /**
         * Android DNS  0伪装  1正常
         */
        android_dns_model: DictionaryModel[]

        /**
         * 退款来源  1管理员发起  2用户发起
         */
        refund_source: DictionaryModel[]

        /**
         * 退款状态  0 审核中 1 已审核通过 2 未审核通过 3已退款
         */
        refund_status: DictionaryModel[]

        /**
         * 审核状态 0审核中 1 初步审核通过 -1 初步审核不通过 2确认审核通过 -2 确认审核不通过 3已退款
         */
        approval_state: DictionaryModel[]

        /**
         * 用户操作来源  0 用户操作  1后台管理员
         */
        op_source_type: DictionaryModel[]

        /**
         * 套餐价格类型 0,正常购买 1注册赠送 2转套餐赠送
         */
        package_price_type: DictionaryModel[]
        /**
         * 充值卡 充值类型 0 用户充值 1活动获取
         */
        card_recharge_type: DictionaryModel[]
        /**
         * 积分来源  1.系统长期 2 系统短期 3 人工长期 4 人工短期
         */
        point_from_type: DictionaryModel[]
        /**
         * 游戏上报处理状态  0 待处理 1 已处理 2不处理
         */
        game_report_state: DictionaryModel[]
        /**
         * 游戏上报处理状态  0 国内 1 国外
         */
        product_type: DictionaryModel[]
        /**
         * 订单来源  0 奇妙官网 1 PC客户端 2 IOS客户端 3 Android客户端 4 Apple内购
         */
        invoice_from: DictionaryModel[]
        /**
         *
         */
        open_login_type: DictionaryModel[]
        /**
         *
         */
        phone_bind_type: DictionaryModel[]
        /**
         *  {
            "id": 1,
            "name": "单页类型"
            },
            {
                "id": 2,
                "name": "内容类型"
            },
            {
                "id": 3,
                "name": "外链类型"
            }
         */
        cms_channel_type: DictionaryModel[]
        /**
         *  {
                "id": 0,
                "name": "显示"
            },
            {
                "id": 1,
                "name": "隐藏"
            }
         */
        cms_channel_hidden: DictionaryModel[]
        /**
         * "cms_channel_open_type": [
      {
        "id": 0,
        "name": "当前标签打开"
      },
      {
        "id": 1,
        "name": "新标签打开"
      }
    ]
         */
        cms_channel_open_type: DictionaryModel[]
        /**
         * "discount_type": [
      {
        "id": 0,
        "name": "打折"
      },
      {
        "id": 1,
        "name": "现金券"
      }
    ]
         */
        discount_type: DictionaryModel[]
        /*
         "port_line_type": [
      {
        "id": 0,
        "name": "socks"
      },
      {
        "id": 1,
        "name": "vpn（pptp,l2tp,ikv2)"
      },
      {
        "id": 2,
        "name": "本地虚拟网卡+socks"
      }
    ], */
        port_line_type: DictionaryModel[]
        /**
     *  "node_type": [
      {
        "id": 0,
        "name": "绑定server_type in (0,2)"
      },
      {
        "id": 1,
        "name": "绑定server_type in (1,2)"
      }
    ],
     */
        node_type: DictionaryModel[]
        /**
     *  'present_type' => [
            'public_activity_present_type_card'  => 0,//充值卡
            'public_activity_present_type_money' => 1,//现金红包
            'public_activity_present_type_object'=> 2,//实物
        ],
     */
        present_type: DictionaryModel[]
        /**
         *  {
        "id": 0,
        "name": "等兑换"
      },
      {
        "id": 1,
        "name": "已申请"
      },
      {
        "id": 2,
        "name": "已发出"
      },
      {
        "id": 3,
        "name": "已领取"
      }
         */
        activity_prize_status: DictionaryModel[]
        /**
         *  {
        "id": 86,
        "name": "中国"
      }
         */
        country: DictionaryModel[]
        /**
         *  {
        "id": "zh_CN",
        "name": "zh_CN"
      },
      {
        "id": "en",
        "name": "en"
      }e": "中国"
      }
         */
        language_resources: DictionaryModel[]
        /**
         * {
        "id": 1,
        "name": "套餐"
      }
         */
        language_type: DictionaryModel[]
        /**
         *   {
        "id": 0,
        "name": "国际区"
      },
      {
        "id": 1,
        "name": "中国区"
      }
         */
        region_code: DictionaryModel[];
        /**
         * 登录账号类型
         */
        login_account_type: DictionaryModel[]
        /**
         * 登录类型
         */
        login_type: DictionaryModel[]
        /**
         * 1.爱奇艺VIP会员
         */
        other_card_type: DictionaryModel[]
        /**
             "activity_present_type":[
            {
                "id":0,
                "name":"随机抽奖"
            },
            {
                "id":1,
                "name":"指定抽奖"
            }
        ],
         */
        activity_present_type: DictionaryModel[]
        attend_appoint_type: DictionaryModel[]
        /**
         * 推荐赠送时长周期
         */
        round_times_type: DictionaryModel[]
        /**
         * 主账号类型  0 手机  1邮箱
         */
        master_account: DictionaryModel[]
        /**
         * 活动图片字典
         */
        img_key_type: DictionaryModel[];
        /**
         * 积分来源
         */
        public_user_point_edit_type: DictionaryModel[];
        /**
         * 卡定义类型
         */
        card_define_type: DictionaryModel[]
        /**
         * 用户操作日志 字典
         */
        public_user_operate_type: DictionaryModel[]
        create_www_html: DictionaryModel[]

        public_report_contact_type:DictionaryModel[]
        public_report_net_type:DictionaryModel[]
    }
}
