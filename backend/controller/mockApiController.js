
 export const getRealTimeStockPrice = (req, res)   => {
    try{
        const min = 75;
        const max = 125;
       const stockPrice=  (Math.random() * (max - min) + min).toFixed(2);
         res.status(200).json({ "stock-price" : stockPrice });
    }
    catch(err)
    {
        console.error("Error fetching stock price:", err);
        res.status(500).json({ message: "Server error while fetching stock price." });
    }
  };




  
  