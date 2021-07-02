package model

import "errors"

// 查询
func GetUser(username string) (User, error) {
	var user User
	err := DB.Get(&user, "select * from user where username = ?", username)
	return user, err
}

// 注册
func NewUser(user *User) error {
	tx := DB.MustBegin()
	result, err := DB.Exec("insert into user (`username`,`password`,`email`,`addition`) values(?,?,?,?)", user.Username, user.Password, user.Email, user.Addition)
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

// 更新
func SetUser(id int, user User) error {
	tx := DB.MustBegin()
	result, err := DB.Exec("update user set password=?,email=?,addition? where id=?", user.Password, user.Email, user.Addition, user.Id)
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
