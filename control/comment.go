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
		Username: c.FormValue("username"),
		Datetime: Number64(c.FormValue("datetime")),
		Content:  c.FormValue("content"),
		UID:      Number(c.FormValue("uid")),
	}

	idx, err := model.PostComment(comment)
	if err != nil {
		return c.JSON(http.StatusOK, Fail("发布评论失败！", "-1"))
	}

	return c.JSON(http.StatusOK, Succ("发布评论成功！", idx))
}

// 点赞评论
func LikeComment(c echo.Context) error {
	target := c.QueryParam("target")
	cid := c.QueryParam("cid")

	err := model.LikeComment(target, Number(cid))
	if err != nil {
		println(err.Error())
	}
	return c.JSON(http.StatusOK, Succ("赞！", ""))
}

// 取赞评论
func DislikeComment(c echo.Context) error {
	target := c.QueryParam("target")
	cid := c.QueryParam("cid")

	err := model.DislikeComment(target, Number(cid))
	if err != nil {
		println(err.Error())
	}
	return c.JSON(http.StatusOK, Succ("赞！", ""))
}

// 获取回复
func GetReply(c echo.Context) error {
	page := Number(c.QueryParam("page"))
	limit := Number(c.QueryParam("limit"))
	cid := Number(c.QueryParam("cid"))
	list, err := model.GetReply(page, limit, cid)
	if err != nil {
		println(err.Error())
		return c.JSON(http.StatusOK, Fail("获取评论失败！", ""))
	}

	return c.JSON(http.StatusOK, Succ("获取评论成功！", list))
}

// 发布回复
func PostReply(c echo.Context) error {
	var comment = &model.Comment{
		Username: c.FormValue("username"),
		Datetime: Number64(c.FormValue("datetime")),
		Content:  c.FormValue("content"),
		UID:      Number(c.FormValue("uid")),
	}

	idx, err := model.PostComment(comment)
	if err != nil {
		return c.JSON(http.StatusOK, Fail("发布评论失败！", "-1"))
	}

	return c.JSON(http.StatusOK, Succ("发布评论成功！", idx))
}
