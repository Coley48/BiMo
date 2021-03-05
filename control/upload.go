package control

import (
	"io"
	"log"
	"net/http"
	"os"
)

// UploadAPI .
func UploadAPI(w http.ResponseWriter, r *http.Request) {
	if !MethodCheck(r, "POST") {
		Fail(w, "非法请求！")
		return
	}
	if !TokenCheck(w, r) {
		// http.Redirect(w, r, "./login", 307)
		return
	}

	r.ParseMultipartForm(10 << 20) //设置内存大小

	files := r.MultipartForm.File["file"] //获取上传的文件组
	len := len(files)
	for i := 0; i < len; i++ {
		file, err := files[i].Open() //打开上传的文件
		defer file.Close()
		if err != nil {
			log.Println(1, err)
		}

		// os.Mkdir("./upload/"+id, os.ModePerm) //创建上传目录
		cur, err := os.Create("./upload/" + files[i].Filename) //创建上传文件
		defer cur.Close()
		if err != nil {
			log.Println(2, err)
		}
		io.Copy(cur, file)
	}
	Success(w, "上传成功！")

}
