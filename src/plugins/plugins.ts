import {SeedlistCryptor} from "./seedlist/crypto";

export let versions =["seedlist"];

export let CryptoMachines = {
	"seedlist": new SeedlistCryptor()
}
