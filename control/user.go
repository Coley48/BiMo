package control

import (
	"encoding/json"
	"log"
	"net/http"

	"../model"
)

// LoginAPI 登录登出
func LoginAPI(w http.ResponseWriter, r *http.Request) {
	if MethodCheck(r, "POST") { // 登录
		if TokenCheck(w, r) {
			Fail(w, "您已登录，请勿重复登录！") // 已登录
			return
		}
		var mode model.User
		err := json.NewDecoder(r.Body).Decode(&mode)

		if err != nil {
			Fail(w, "内部错误！")
			log.Println(err.Error())
			return
		}

		mode.Username = decode(mode.Username)
		mode.Password = decode(mode.Password)

		user, accountErr := model.UserInquireDB(mode.Username) // 查找用户
		if accountErr != nil || Encrypt(mode.Password) != user.Password {
			Fail(w, "账号或密码错误！")
			return
		}
		SetCookie(w, user)
		Success(w, "欢迎你，"+user.Username) // 登录成功

	} else if MethodCheck(r, "GET") { // 登出
		if TokenCheck(w, r) { // 登录状态
			DelCookie(w, r, "token")
			Success(w, "已注销！")
			return
		}

		Fail(w, "未登录！")
	}
}
