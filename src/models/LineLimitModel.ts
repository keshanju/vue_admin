export interface LineLimitModel {
  account_token?: string;
  id?: number; //` int(11) unsigned NOT NULL AUTO_INCREMENT,
  line_id?: number; //` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '线路ID',
  max_bandwidth?: number; //` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '最大带宽',
  min_bandwidth?: number; //` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '最小带宽',
  total_bandwidth?: number; //` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '总带宽',
  create_time?: string; //` datetime DEFAULT NULL COMMENT '创建时间',
  create_staff_id?: number; //` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建人ID',
  change_time?: string; //` datetime DEFAULT NULL COMMENT '最后修改时间',
  change_staff_id?: number; //` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '最后修改人ID',
  delete_time?: string; //` datetime DEFAULT NULL COMMENT '删除时间',
  delete_staff_id?: number; //` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '删除人ID',
}
