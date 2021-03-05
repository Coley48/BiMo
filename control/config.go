package control

import (
	"io"
	"log"
	"net/http"
	"os"
)

const path = "./data/"
const defaultFile = "config-default.json"
const customFile = "config-custom.json"

// ConfigAPI .
func ConfigAPI(w http.ResponseWriter, r *http.Request) {
	if MethodCheck(r, "GET") {
		r.ParseForm()
		if r.FormValue("action") == "reset" {
			input, _ := os.OpenFile(path+defaultFile, os.O_RDONLY, 0666)
			output, _ := os.OpenFile(path+customFile, os.O_WRONLY|os.O_TRUNC|os.O_CREATE, 0666)
			io.Copy(output, input)
			Success(w, "重置成功！")
			defer input.Close()
			defer output.Close()
			return
		}
		http.ServeFile(w, r, "./data/config-custom.json")
	} else if MethodCheck(r, "POST") && TokenCheck(w, r) {
		r.ParseForm()

		fileBody, _, err := r.FormFile("file")
		if err != nil {
			Fail(w, "上传失败！")
			return
		}

		// 文件不存在，创建
		// _, err = os.Stat(path + customFile)
		// if err != nil {
		// 	outFile, _ := os.OpenFile(path+customFile, os.O_WRONLY|os.O_CREATE, 0666)
		// 	io.Copy(outFile, fileBody)
		// 	defer outFile.Close()
		// 	defer fileBody.Close()
		// 	Success(w, fileHeader.Filename)

		// 	return
		// }

		// 文件存在，覆盖
		saveFile, err := os.OpenFile(path+customFile, os.O_WRONLY|os.O_CREATE, 0666)
		if err != nil {
			Fail(w, "内部错误！")
			log.Println(err.Error())
			return
		}
		io.Copy(saveFile, fileBody)

		defer fileBody.Close()
		defer saveFile.Close()
		Success(w, "上传成功！")
	}
}
