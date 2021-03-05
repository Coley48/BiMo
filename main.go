package main

import (
	"log"
	"net/http"

	"./control"
)

func main() {
	http.HandleFunc("/api/login", control.LoginAPI)   // 登录登出api
	http.HandleFunc("/api/upload", control.UploadAPI) // 上传文件api
	http.HandleFunc("/api/delete", control.DeleteAPI) // 删除文件api
	http.HandleFunc("/api/config", control.ConfigAPI) // 配置文件api
	http.HandleFunc("/api/update", control.UpdateAPI) // 数据更新api

	// err := http.ListenAndServeTLS(":8080", "./conf/ca/coley48.cn.pem", "./conf/ca/coley48.cn.key", nil)
	// if err != nil {
	// 	log.Fatal("ListenAndServe:", err.Error())
	// }

	log.Println("Starting...")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe:", err.Error())
	}
}
