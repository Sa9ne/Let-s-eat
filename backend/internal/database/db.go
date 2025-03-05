package database

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

type Dishes struct {
	ID          uint   `gorm:"PrimaryKey"`
	Name        string `json:"name"`
	Discription string `json:"discription"`
	Time        int    `jsom:"time"`
}

func ConnectDB() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Failed to load .env file")
	}

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("Database_url not found")
	}

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed connect database: %v", err)
	}
	fmt.Println("Successful database connect")

	DB.AutoMigrate(&Dishes{})
}
