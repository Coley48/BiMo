package main

import (
	"github.com/Coley48/server/control"

	"github.com/labstack/echo/v4"
)

func TokenCheck(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		if control.CheckToken(c) {
			return next(c)
		}
		return control.Error(c)
	}
}

func main() {
	// 实例化echo对象
	e := echo.New()

	// 中间件
	// e.Use(TokenCheck)
	// e.Group("/api/get", TokenCheck)
	e.Group("/api/post", TokenCheck)

	// 注册请求，并且绑定控制器函数
	e.POST("/api/sign/in", control.SignInHandler)
	e.POST("/api/sign/up", control.SignUpHandler)
	e.GET("/api/get/comment", control.GetComment)
	e.POST("/api/post/comment", control.PostComment)
	e.GET("/api/like/comment", control.LikeComment)
	e.GET("/api/dislike/comment", control.DislikeComment)

	// 启动http server，并监听8080端口
	e.Start(":8000")
}
