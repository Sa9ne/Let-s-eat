package server

import (
	"LetsEat/backend/auth-service/internal/database"
	"LetsEat/backend/auth-service/internal/handlers"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Start() {
	s := gin.Default()

	s.Use(cors.Default())

	database.ConnectDB()

	s.GET("/", handlers.WelcomeReq)
	s.POST("/register", handlers.Register)
	s.POST("/login", handlers.Login)
	s.GET("/profile", handlers.Profile)

	err := s.Run(":8082")
	if err != nil {
		log.Println("Server doesn't start")
	}
}
