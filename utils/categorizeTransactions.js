export function categorizeTransactionsByMonth(transactions) {
  const monthMapping = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };

  // Initialize result dictionary
  const result = {};

  // Process each transaction
  transactions.forEach((transaction) => {
    const createdAt = new Date(transaction.createdAt);
    const month = monthMapping[createdAt.getMonth()];

    // Ensure the month entry exists in the result
    if (!result[month]) {
      result[month] = { completed: 0, pending: 0, cancelled: 0 };
    }

    const status = transaction.transaction_status.toLowerCase();
    if (status in result[month]) {
      result[month][status] += 1;
    }
  });

  // Format the result as per the required structure
  const formattedResult = Object.keys(result).map((month) => ({
    month,
    completed: result[month].completed,
    pending: result[month].pending,
    cancelled: result[month].cancelled,
  }));

  return formattedResult;
}

export function countTransactionStatus(transactions) {
  const statusCount = transactions.reduce((acc, transaction) => {
    const status = transaction.transaction_status;
    if (acc[status]) {
      acc[status]++;
    } else {
      acc[status] = 1;
    }
    return acc;
  }, {});

  return Object.keys(statusCount).map((status) => ({
    id: status,
    label: status,
    value: statusCount[status],
  }));
}
