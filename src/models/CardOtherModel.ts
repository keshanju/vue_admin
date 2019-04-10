
/**
 * 第三方卡类别定义
 */
export interface CardOtherDefineModel {
    account_token?: string;
    id?: number;//` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
    title?: string;//` varchar(100) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '卡名称',
    type?: number;//` int(3) DEFAULT '0' COMMENT '类型 1:爱奇艺会员',
    price?: number;//` int(11) DEFAULT NULL COMMENT '单价',
    price_type?: number;//` tinyint(3) DEFAULT NULL COMMENT '价格类型',
    desc?: string;//` varchar(200) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '描述',
    is_valid?: number;//` int(11) DEFAULT NULL COMMENT '是否有效',
    create_time?: string;//` datetime DEFAULT NULL COMMENT '创建时间',
    create_staff_id?: number;//` int(11) DEFAULT NULL COMMENT '创建人',
    change_time?: string;//` datetime DEFAULT NULL COMMENT '修改时间',
    change_staff_id?: number;//` int(11) DEFAULT NULL COMMENT '修改建人',
    delete_time?: string;//` datetime DEFAULT NULL COMMENT '删除时间',
    delete_staff_id?: number;//` int(11) DEFAULT NULL COMMENT '删除建人',
}

/**
 * 第三方卡废弃卡
 */
export interface CardOtherAbandonModel {
    account_token?: string;
    id?: number;//` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
    card_define_id?: number;//` int(11) unsigned DEFAULT '0' COMMENT '卡定义id',
    card_number?: string;//` varchar(100) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '卡号',
    card_password?: string;//` varchar(100) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '卡密',
    expired_time?: string;//` datetime DEFAULT NULL COMMENT '超期时间',
    create_staff_id?: number;//` int(11) unsigned DEFAULT '0' COMMENT '创建员工id',
    create_time?: string;//` datetime DEFAULT NULL COMMENT '创建时间',
    abandon_staff_id?: number;//` int(11) unsigned DEFAULT '0' COMMENT '废弃员工ID',
    abandon_time?: string;//` datetime DEFAULT NULL COMMENT '废弃时间',
}

/**
 * 第三方卡未使用卡
 */
export interface CardOtherUnUsedModel {
    account_token?: string;
    id?: number;//` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
    card_define_id?: number;//` int(11) unsigned DEFAULT '0' COMMENT '卡定义id',
    card_number?: string;//` varchar(100) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '卡号',
    card_password?: string;//` varchar(100) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '卡密',
    expired_time?: string;//` datetime DEFAULT NULL COMMENT '超期时间',
    create_staff_id?: number;//` int(11) unsigned DEFAULT '0' COMMENT '创建员工id',
    create_time?: string;//` datetime DEFAULT NULL COMMENT '创建时间',
}

/**
 * 第三方卡已使用卡
 */
export interface CardOtherUsedModel {
    account_token?: string;
    id?: number;//` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
    card_define_id?: number;//` int(11) unsigned DEFAULT '0' COMMENT '卡定义id',
    card_number?: string;//` varchar(100) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '卡号',
    card_password?: string;//` varchar(100) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '卡密',
    expired_time?: string;//` datetime DEFAULT NULL COMMENT '超期时间',
    create_staff_id?: number;//` int(11) unsigned DEFAULT '0' COMMENT '创建员工id',
    create_time?: string;//` datetime DEFAULT NULL COMMENT '创建时间',
    used_user_id?: number;//` int(11) unsigned DEFAULT '0' COMMENT '使用人ID',
    used_time?: string;//` datetime DEFAULT NULL COMMENT '使用时间',
}