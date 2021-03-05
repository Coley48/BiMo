package control

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"

	"../model"
)

// UpdateAPI 更新数据
func UpdateAPI(w http.ResponseWriter, r *http.Request) {
	if !TokenCheck(w, r) || !MethodCheck(r, "POST") {
		return
	}

	switch r.URL.RawQuery {
	case "config": // 更新配置文件
		data, _ := ioutil.ReadAll(r.Body)
		decodeData, decodeErr := url.PathUnescape(string(data))
		if decodeErr != nil {
			log.Println(decodeErr.Error())
			Fail(w, "解析失败!")
			return
		}

		writeErr := ioutil.WriteFile(path+customFile, []byte(decodeData), 0666)
		if writeErr != nil {
			log.Println(writeErr.Error())
			Fail(w, "更新失败！")
			return
		}
		Success(w, "更新成功")

	case "password": // 修改密码
		var mode model.User
		err := json.NewDecoder(r.Body).Decode(&mode)

		if err != nil {
			Fail(w, "解析错误！")
			log.Println(err.Error())
			return
		}

		mode.Username = decode(mode.Username)
		mode.Password = decode(mode.Password)
		println(mode.Username, Encrypt(mode.Password))

		updateErr := model.UpdatePasswordDB(mode.Username, Encrypt(mode.Password)) // 查找用户
		if updateErr != nil {
			Fail(w, "内部错误！")
			log.Println(updateErr.Error())
			return
		}

		DelCookie(w, r, "token")
		Success(w, "密码已修改，请重新登录！")
	default:
		Fail(w, "拒绝访问！")
	}
}
