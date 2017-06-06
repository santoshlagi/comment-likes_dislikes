# comment-likes_dislikes
prerequisities:
1)nodejs 
2)mysql workbench
Installing:
1)download the nodejs and install it
2)down the mysql workbench database and install it in the system.
  After instalation it asks for the username and password change this accordingly
  username:root
  password:mrnd
Database table:
1)In the database create a table with a name called 'com' and include four columns in it 'id','comment','up','down'.
2)choose the datatype as number and make the column 'id' as primarykey(select pk checkbox) and selet autoincrement(select AI checkbox) option for the 'id'
3)choose the datatype as longtext for 'comment'
4)choose the datatype as number for 'up' and 'down' columns.
Running the testcases:
In the command prompt go to the project folder where you have stored the file and in that run the server.js file using the command
node server.js.
After that you will get a text like connected to 3001.Open any browser and type localhost:3001 and run you will get the page opened
