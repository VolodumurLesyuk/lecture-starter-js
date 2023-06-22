import controls from '../../constants/controls';

export function getDamage(attackerPower, defenderPower) {
  const damage = Math.max(attackerPower - defenderPower, 0);
  console.log(damage)
  return damage;
}

export function getHitPower(fighter) {
  const { attack } = fighter;
  const randomValue = Math.random() * (2 - 1) + 1; // Generate random value between 1 and 2
  const power = attack * randomValue
  return power;
}

export function getBlockPower(fighter) {
  const { defense } = fighter;
  console.log(fighter)
  const randomValue = Math.random() * (2 - 1) + 1; // Generate random value between 1 and 2
  const power = defense * randomValue;
  console.log(power)
  return power;
}

export async function fight(firstFighter, secondFighter) {
  return new Promise(resolve => {
	const maxRounds = 1; // Максимальна кількість раундів
	let currentRound = 1;
	let winner = null;

	while (currentRound <= maxRounds) {
  	const firstFighterHitPower = getHitPower(firstFighter);
  	const secondFighterHitPower = getHitPower(secondFighter);

  	const firstFighterBlockPower = getBlockPower(firstFighter);
  	const secondFighterBlockPower = getBlockPower(secondFighter);

  	const firstFighterDamage = getDamage(secondFighterHitPower, firstFighterBlockPower);
  	const secondFighterDamage = getDamage(firstFighterHitPower, secondFighterBlockPower);

  	firstFighter.health -= firstFighterDamage;
  	secondFighter.health -= secondFighterDamage;

  	if (firstFighter.health <= 0 && secondFighter.health <= 0) {
    	// Нічия
    	winner = null;
    	break;
  	} else if (firstFighter.health <= 0) {
    	// Переможець - другий боєць
    	winner = secondFighter;
    	break;
  	} else if (secondFighter.health <= 0) {
    	// Переможець - перший боєць
    	winner = firstFighter;
    	break;
  	}

  	currentRound++;
	}

	resolve(winner);
  });
}



