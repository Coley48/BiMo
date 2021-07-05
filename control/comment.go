package control

import (
	"net/http"

	"github.com/Coley48/server/model"
	"github.com/labstack/echo/v4"
)

// 获取评论
func GetComment(c echo.Context) error {
	page := Number(c.QueryParam("page"))
	limit := Number(c.QueryParam("limit"))
	list, err := model.GetComment(page, limit)
	if err != nil {
		println(err.Error())
		return c.JSON(http.StatusOK, Fail("获取评论失败！", ""))
	}

	return c.JSON(http.StatusOK, Succ("获取评论成功！", list))
}

// 发布评论
func PostComment(c echo.Context) error {
	var comment = &model.Comment{
		CID:      Number(c.FormValue("cid")),
		Username: c.FormValue("username"),
		Datetime: c.FormValue("datetime"),
		Content:  c.FormValue("content"),
		UID:      Number(c.FormValue("uid")),
	}
	err := model.PostComment(comment)
	if err != nil {
		return c.JSON(http.StatusOK, Fail("发布评论失败！", ""))
	}

	return c.JSON(http.StatusOK, Succ("发布评论成功！", ""))
}
