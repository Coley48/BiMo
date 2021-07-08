package control

import (
	"net/http"

	"github.com/Coley48/server/model"
	"github.com/labstack/echo/v4"
)

func SignInHandler(c echo.Context) error {
	username := c.FormValue("username")
	password := c.FormValue("password")

	user, err := model.GetUser(username)
	if err != nil || user.Password != Encrypt(password) {
		println(err.Error())
		return c.JSON(http.StatusOK, Fail("账号或密码错误", ""))
	}

	var userinfo = model.UserInfo{
		ID:       user.ID,
		Username: user.Username,
		Avator:   user.Avator,
		Email:    user.Email,
	}
	return c.JSON(http.StatusOK, Succ("欢迎回来！"+username, userinfo))
}

func SignUpHandler(c echo.Context) error {
	username := c.FormValue("username")
	password := c.FormValue("password")
	email := c.FormValue("email")

	_, err := model.GetUser(username)
	if err == nil {
		return c.JSON(http.StatusOK, Fail("该用户名已被注册！", ""))
	}

	var newUser = &model.User{
		Username: username,
		Password: Encrypt(password),
		Email:    email,
	}
	model.NewUser(newUser)

	return c.JSON(http.StatusOK, Succ("欢迎你！"+username, ""))
}
