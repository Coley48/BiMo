package main

import (
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql" //
	"github.com/jmoiron/sqlx"
)

const (
	user     = "root"      // 数据库用户名.
	dbname   = "blog"      // 数据库名
	port     = "3306"      // 端口号
	password = "root"      // 密码
	ip       = "127.0.0.1" // 服务器ip地址
)

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

	// DB.SetConnMaxLifetime(100) // 设置数据库最大连接数
	// DB.SetMaxIdleConns(10)     // 设置数据库最大闲置连接数
	// //验证连接
	// if err := DB.Ping(); err != nil {
	// 	log.Println("opon database fail")
	// }
}

type Config struct {
	ID      int
	Content string
	Role    string
}

func configFile(w http.ResponseWriter, r *http.Request) {
	println(1234)
	if r.Method == "GET" {
		// var config Config
		// err := DB.Get(&config, `select * from bimo where role = usage`)
		// if err != nil {
		// 	log.Println(err.Error())
		// 	w.Write([]byte("fail to get data"))
		// 	return
		// }

		// w.Write([]byte(config.Content))

		http.ServeFile(w, r, "./src/data/config.json")
	} else if r.Method == "POST" {
		str := "{}"
		tx := DB.MustBegin()
		result, err := DB.Exec("update bimo set content = ? where role = usage", str)
		if err != nil {
			tx.Rollback()
			return
		}
		row, _ := result.RowsAffected()
		if row != 1 {
			tx.Rollback()
			return
		}
	}
}

func main() {
	http.HandleFunc("/API/configFile", configFile)

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe:", err.Error())
	}
}
