from flask import Flask, request, jsonify
import pymysql
pymysql.install_as_MySQLdb()

import MySQLdb
db = MySQLdb.connect(host="localhost",
					user="root",
					passwd="",
					db="mmdata")

app = Flask(__name__);

def readTransactions(dateMin, dateMax, category):
	output = "readTransactions: from " + dateMin + " to " + dateMax + " of " + category
	return output

def createTransaction(input):
	output = "readTransactions:" + input
	return output


@app.route('/transactions/read', methods=["GET","POST"])
def returnTransactions():
	d1 = request.form.get('dateFrom')
	d2 = request.form.get('dateTo')
	c = request.form.get('category')
	cur = db.cursor()

	return readTransactions(d1,d2,c)

@app.route('/script/', methods=['POST'])
def runScript():
	script = request.values.get('script')
	cur = db.cursor()
	cur.execute(script)
	return jsonify(results=cur.fetchall())
	db.close()
	
if __name__ == "__main__":
	app.run(host="0.0.0.0", port=int("80"))