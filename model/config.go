package model

import (
	"log"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

const (
	user     = "root"      // 数据库用户名.
	dbname   = "bimo"      // 数据库名
	port     = "3306"      // 端口号
	password = "kk1100.."  // 密码
	ip       = "127.0.0.1" // 服务器ip地址
)

// Keys .
const Keys = "bimo.coley48.cn"

// DB 服务器数据库
var DB *sqlx.DB

// init 全局配置
func init() {
	path := user + ":" + password + "@tcp(" + ip + ":" + port + ")/" + dbname + "?charset=utf8&parseTime=true"
	db, err := sqlx.Open("mysql", path)

	if err != nil {
		log.Fatal(err.Error())
	}
	DB = db
}
