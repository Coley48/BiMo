package model

import "errors"

// 查询用户信息
func GetUser(username string) (User, error) {
	var user User
	err := DB.Get(&user, "select * from user where username = ?", username)
	return user, err
}

// 用户注册
func NewUser(user *User) error {
	tx := DB.MustBegin()
	result, err := DB.Exec("insert into user (`username`,`password`,`email`) values(?,?,?,?)", user.Username, user.Password, user.Email)
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
	result, err := DB.Exec("update user set password=?,email=?,addition? where id=?", user.Password, user.Email, user.Addition, user.ID)
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
func GetComment(page, limit int) ([]CommentA, error) {
	list := make([]CommentA, 0, limit)
	err := DB.Select(&list, "select `comment`.*,`user`.avator from `comment` INNER JOIN `user` on `comment`.uid = `user`.id order by cid desc limit ?,?", (page-1)*limit, limit)
	return list, err
}

// 发布评论
func PostComment(comment *Comment) error {
	tx := DB.MustBegin()
	result, err := DB.Exec("insert into comment (`cid`,`username`,`datetime`,`content`,`uid`) values(?,?,?,?,?)", comment.CID, comment.Username, comment.Datetime, comment.Content, comment.UID)
	row, _ := result.RowsAffected()
	if row != 1 {
		tx.Rollback()
		return errors.New("PostComment failed.")
	}
	if err != nil {
		tx.Rollback()
		return err
	}
	return nil
}
