package model

import (
	"errors"
)

// 查询用户信息
func GetUser(username string) (User, error) {
	var user User
	err := DB.Get(&user, "select * from user where username = ?", username)
	return user, err
}

// 用户注册
func NewUser(user *User) error {
	tx := DB.MustBegin()
	result, err := DB.Exec("insert into user (`username`,`password`,`email`) values(?,?,?)", user.Username, user.Password, user.Email)
	row, _ := result.RowsAffected()
	if row != 1 {
		tx.Rollback()
		return errors.New("NewUser failed.")
	}
	if err != nil {
		tx.Rollback()
		return err
	}
	return nil
}

// 更新用户信息
func SetUser(id int, user User) error {
	tx := DB.MustBegin()
	result, err := DB.Exec("update user set password=?,email=?,addition=? where id=?", user.Password, user.Email, user.Addition, user.ID)
	row, _ := result.RowsAffected()
	if row != 1 {
		tx.Rollback()
		return errors.New("SetUser failed.")
	}
	if err != nil {
		tx.Rollback()
		return err
	}
	return nil
}

// 获取头像
func GetAvator(id int) (string, error) {
	var avator string
	err := DB.Get(&avator, "select avator from user where id = ?", id)
	return avator, err
}

// 获取评论
func GetComment(page, limit int) ([]Comment, error) {
	list := make([]Comment, 0, limit)
	err := DB.Select(&list, "select `comment`.*,`user`.avator from `comment` INNER JOIN `user` on `comment`.uid = `user`.id order by id desc limit ?,?", (page-1)*limit, limit)
	return list, err
}

// 发布评论
func PostComment(com *Comment) (int64, error) {
	tx := DB.MustBegin()
	result, err := DB.Exec("insert into comment (`username`,`datetime`,`content`,`uid`) values(?,?,?,?)", com.Username, com.Datetime, com.Content, com.UID)
	row, _ := result.RowsAffected()
	if row != 1 {
		tx.Rollback()
		return -1, errors.New("PostComment failed.")
	}
	if err != nil {
		tx.Rollback()
		return -1, err
	}
	return result.LastInsertId()
}

// 点赞评论
func LikeComment(target string, id int) error {
	return addOne(target, "likes", id)
}

// 取赞评论
func DislikeComment(target string, id int) error {
	return decOne(target, "likes", id)
}

// 获取回复
func GetReply(page, limit, cid, start int) ([]Reply, error) {
	list := make([]Reply, 0, limit)
	err := DB.Select(&list, "select `reply`.*,`user`.avator from `reply` INNER JOIN `user` on `reply`.uid = `user`.id where cid = ? order by id desc limit ?,?", cid, (page-1)*limit+start, limit)
	return list, err
}

// 发布回复
func PostReply(rep *Reply) (int64, error) {
	tx := DB.MustBegin()
	result, err := DB.Exec("insert into reply (`username`,`datetime`,`content`,`uid`,`cid`) values(?,?,?,?,?)", rep.Username, rep.Datetime, rep.Content, rep.UID, rep.CID)
	row, _ := result.RowsAffected()
	if row != 1 {
		tx.Rollback()
		return -1, errors.New("PostReply failed.")
	}
	if err != nil {
		tx.Rollback()
		return -1, err
	}
	return result.LastInsertId()
}

// 评论加一
func AddReply(id int) error {
	return addOne("comment", "reply", id)
}

// 加一
func addOne(target string, key string, id int) error {
	tx := DB.MustBegin()
	result, err := DB.Exec("update "+target+" set "+key+"="+key+"+1 where id=?", id)
	row, _ := result.RowsAffected()
	if row != 1 {
		tx.Rollback()
		return errors.New("addOne failed.")
	}
	if err != nil {
		tx.Rollback()
		return err
	}
	return nil
}

// 减一
func decOne(target string, key string, id int) error {
	tx := DB.MustBegin()
	result, err := DB.Exec("update "+target+" set "+key+"="+key+"-1 where id=?", id)
	row, _ := result.RowsAffected()
	if row != 1 {
		tx.Rollback()
		return errors.New("addOne failed.")
	}
	if err != nil {
		tx.Rollback()
		return err
	}
	return nil
}
