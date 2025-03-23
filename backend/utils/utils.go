package utils

import (
	"github.com/joho/godotenv"
	"log"
	"os"
)

type Envs struct {
	OPEN_AI_KEY           string
	RPC_URL               string
	PRIVATE_KEY           string
	GAME_CONTRACT_ADDRESS string
	ADMIN_ADDRESS         string
}

var loaded bool

var envs Envs

func LoadEnvs() Envs {
	if loaded {
		return envs
	}
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
	envs = Envs{
		OPEN_AI_KEY:           os.Getenv("OPEN_AI_KEY"),
		RPC_URL:               os.Getenv("RPC_URL"),
		PRIVATE_KEY:           os.Getenv("PRIVATE_KEY"),
		GAME_CONTRACT_ADDRESS: os.Getenv("GAME_CONTRACT_ADDRESS"),
		ADMIN_ADDRESS:         os.Getenv("ADMIN_ADDRESS"),
	}
	loaded = true
	return envs
}
