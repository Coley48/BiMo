package main

import (
	"github.com/Coley48/server/control"

	"github.com/labstack/echo/v4"
)

func main() {
	//实例化echo对象
	e := echo.New()

	//注册一个Get请求, 路由地址为: /tizi365  并且绑定一个控制器函数
	e.POST("/api/sign-in", control.SignInHandler)
	e.POST("/api/sign-up", control.SignUpHandler)
	e.GET("/api/get-comment", control.GetComment)
	e.POST("/api/post-comment", control.PostComment)

	//启动http server, 并监听8080端口
	e.Start(":8000")
}
