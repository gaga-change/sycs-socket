/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : localhost:3306
 Source Schema         : chat

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : 65001

 Date: 24/03/2018 23:47:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msg` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '消息内容',
  `time` timestamp(0) NULL DEFAULT NULL COMMENT '消息时间',
  `user_id` int(11) NOT NULL,
  `order_id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_message`(`user_id`) USING BTREE,
  INDEX `order_message`(`order_id`) USING BTREE,
  CONSTRAINT `order_message` FOREIGN KEY (`order_id`) REFERENCES `user_room` (`order_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_message` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES (1, '123', '2018-03-20 10:24:17', 2, '123');
INSERT INTO `message` VALUES (2, '123', '2018-03-24 10:27:22', 1, '123');
INSERT INTO `message` VALUES (3, '123', '2018-03-24 11:34:30', 1, '123');
INSERT INTO `message` VALUES (4, '123', '2018-03-24 11:34:46', 1, '123');
INSERT INTO `message` VALUES (5, '123', '2018-03-24 23:06:24', 12, 'SYZH20180306-723267143');
INSERT INTO `message` VALUES (6, 'gaga', '2018-03-24 23:06:55', 12, 'SYZH20180306-723267143');
INSERT INTO `message` VALUES (7, 'gaga', '2018-03-24 23:06:55', 12, 'SYZH20180306-723267143');
INSERT INTO `message` VALUES (8, 'gaga', '2018-03-24 23:07:09', 12, 'SYZH20180306-723267143');
INSERT INTO `message` VALUES (9, 'gaga', '2018-03-24 23:07:09', 12, 'SYZH20180306-723267143');
INSERT INTO `message` VALUES (10, 'gaga', '2018-03-24 23:07:18', 12, 'SYZH20180306-723267143');
INSERT INTO `message` VALUES (11, 'gaga', '2018-03-24 23:07:18', 12, 'SYZH20180306-723267143');
INSERT INTO `message` VALUES (12, '123', '2018-03-24 23:08:45', 12, 'SYZH20180306-723267143');
INSERT INTO `message` VALUES (13, 'qwe', '2018-03-24 23:10:06', 12, 'SYZH20180306-723267143');
INSERT INTO `message` VALUES (14, 'qwe', '2018-03-24 23:10:17', 12, 'SYZH20180306-723267143');
INSERT INTO `message` VALUES (15, 'qwe', '2018-03-24 23:10:17', 12, 'SYZH20180306-723267143');
INSERT INTO `message` VALUES (16, 'qwe', '2018-03-24 23:10:21', 12, 'SYZH20180306-723267143');
INSERT INTO `message` VALUES (17, 'qwe', '2018-03-24 23:10:25', 12, 'SYZH20180306-723267143');
INSERT INTO `message` VALUES (18, 'qwe', '2018-03-24 23:10:32', 12, 'SYZH20180306-723267143');
INSERT INTO `message` VALUES (19, '23', '2018-03-24 23:14:07', 12, 'SYZH20180306-723267143');
INSERT INTO `message` VALUES (20, '23gaga', '2018-03-24 23:14:21', 12, 'SYZH20180306-723267143');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'userId',
  `username` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `qq` char(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '客服标识',
  `god` char(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户标识',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '张三', '330489', NULL);
INSERT INTO `user` VALUES (2, '赵二狗', '220677', NULL);
INSERT INTO `user` VALUES (3, '用户1', NULL, '123');
INSERT INTO `user` VALUES (5, 'gaga', '123', NULL);
INSERT INTO `user` VALUES (6, 'gaga', '123', NULL);
INSERT INTO `user` VALUES (7, 'gaga', '123', NULL);
INSERT INTO `user` VALUES (8, 'gaga1', '123', NULL);
INSERT INTO `user` VALUES (10, '1234', NULL, '1234');
INSERT INTO `user` VALUES (11, '1234', NULL, '12345');
INSERT INTO `user` VALUES (12, 'test01', NULL, '969');

-- ----------------------------
-- Table structure for user_room
-- ----------------------------
DROP TABLE IF EXISTS `user_room`;
CREATE TABLE `user_room`  (
  `leave_time` timestamp(0) NULL DEFAULT NULL COMMENT '离开时间',
  `socket_num` int(11) NOT NULL DEFAULT 0 COMMENT 'socket 链接数量',
  `user_id` int(11) NOT NULL,
  `order_id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`user_id`, `order_id`) USING BTREE,
  INDEX `order_id`(`order_id`) USING BTREE,
  CONSTRAINT `user_connect` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_room
-- ----------------------------
INSERT INTO `user_room` VALUES ('2018-03-24 00:00:00', 12, 1, '123');
INSERT INTO `user_room` VALUES ('2018-03-24 11:52:13', 1, 10, '123');
INSERT INTO `user_room` VALUES ('2018-03-24 11:52:53', 0, 11, '123');
INSERT INTO `user_room` VALUES ('2018-03-24 23:13:56', 3, 12, 'SYZH20180306-723267143');

SET FOREIGN_KEY_CHECKS = 1;
