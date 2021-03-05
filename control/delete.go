package control

import (
	"log"
	"net/http"
	"os"
)

const directory = "./upload/"

// DeleteAPI .
func DeleteAPI(w http.ResponseWriter, r *http.Request) {
	if !MethodCheck(r, "GET") {
		Fail(w, "非法请求！")
		return
	}
	if !TokenCheck(w, r) {
		// http.Redirect(w, r, "./login", 307)
		return
	}

	r.ParseForm()
	filename := r.FormValue("target")

	// 文件不存在，创建
	_, err := os.Stat(directory + filename)
	if err != nil {
		Fail(w, "文件不存在!")
		return
	}

	// 文件存在，覆盖
	err = os.Remove(directory + filename)
	if err != nil {
		Fail(w, "内部错误！")
		log.Println(err.Error())
		return
	}

	Success(w, "删除成功！")

}
