# bamazon

This is a CLI based utility that simulate a department store.

There are two views, **Customer** and **Manager** Views.

## Customer View

To enter customer view, type "node bamazonCustomer.js".

The screenshot below shows the presented screen after entering **Customer** view.

![Alt text](/picture/ss01.png?raw=true "ss01")

User can enter the *id* of the item they want to purchase and also the *quantity*.

If there are insufficient quantity, system will report the error and prompt the user if they want to purchase again.

![Alt text](/picture/ss02.png?raw=true "ss02")

If there are sufficient items, the transaction will go through, total amount is shown, and the corresponding quantity is deducted from teh database. User is then prompt if they want to purchase again.

![Alt text](/picture/ss04.png?raw=true "ss04")

User can exit the system by choosing no when prompted to purchase again.

![Alt text](/picture/ss05.png?raw=true "ss05")

## Manager View

To enter Manager view, type "node bamazonManager.js".

There will be four selections:

...View Products for Sale

...View Low Inventory

...Add to Inventory

...Add New Product

...QUIT

**View Products for Sale** will list out all the products durrently in invetory database.

![Alt text](/picture/ss06.png?raw=true "ss06")

**View Low Inventory** will list out all item whose quantity count is less than or equal to 5.

![Alt text](/picture/ss07.png?raw=true "ss07")

**Add to Inventory** will allow manager to add to the quantity of existing item in the database.

![Alt text](/picture/ss08.png?raw=true "ss08")

**Add New Product** will allow manager to add new item that does not exist in database.

![Alt text](/picture/ss09.png?raw=true "ss09")

Selecting **QUIT** will exit from manager view.