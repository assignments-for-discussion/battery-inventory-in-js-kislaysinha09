const assert = require('assert');

// Calculates State of Health (SoH) 
function countBatteriesByHealth(presentCapacities) {
  const RATED_CAPACITY = 120;
  let counts = {
    healthy: 0,
    exchange: 0,
    failed: 0
  };
  for (let capacity of presentCapacities) {
    let soh = (capacity / RATED_CAPACITY) * 100;
    if (soh > 83) {
      counts.healthy++;
    } else if (soh >= 63) {
      counts.exchange++;
    } else {
      counts.failed++;
    }
  }
  return counts;
}

function testBucketingByHealth() {
  console.log('Counting batteries by SoH...');
  const presentCapacities = [113, 116, 80, 95, 92, 70];
  const counts = countBatteriesByHealth(presentCapacities);
  console.log('Original test counts:', counts);
  assert(counts["healthy"] == 2);
  assert(counts["exchange"] == 3);
  assert(counts["failed"] == 1);
  console.log("Done counting :)");

  // Test boundary conditions
  const boundaryCapacities = [100.8, 99.6, 75.6, 74.4, 120, 0];
  const boundaryCounts = countBatteriesByHealth(boundaryCapacities);
  console.log('Boundary test counts:', boundaryCounts);
  assert(boundaryCounts["healthy"] == 2);
  assert(boundaryCounts["exchange"] == 2);
  assert(boundaryCounts["failed"] == 2);
  console.log("Boundary tests passed :)");
}

testBucketingByHealth();
