# jyq创
from flask import Blueprint, jsonify, request
from dao.housedao import HouseDao
import json,decimal
from var.cityclass import CityClass
import numpy as np

housecontroller = Blueprint('housecontroller', __name__)

# 写一个编码类，遇到decimal则转换为float，用于解决'TypeError: Object of type 'Decimal' is not JSON serializable 报错'
class DecimalEncoder(json.JSONEncoder):
    def default(self,o):
        if isinstance(o,decimal.Decimal):
            return float(o)
        super(DecimalEncoder,self).default(o)

@housecontroller.route('/getcitytypeavghouseprice', methods=['GET','POST'])
def getCityTypeAvgPrice():
    # 方法接受的是AJAX请求
    houseDao = HouseDao()
    data = houseDao.statisticCityTypeAvgHousePrice()
    return json.dumps(data,cls=DecimalEncoder) # 加上cls=DecimalEncoder引用DecimalEncouder
    pass

@housecontroller.route('/getprovincialcapitalavghousearea', methods=['GET','POST'])
def getProvincialCapitalAvgHouseArea():
    # 方法接受的是AJAX请求
    houseDao = HouseDao()
    data = houseDao.statisticProvincialCapitalAvgHouseArea()
    return json.dumps(data,cls=DecimalEncoder) # 加上cls=DecimalEncoder引用DecimalEncouder
    pass


@housecontroller.route('/house/getHouseNumberOfProvince')
def getHouseNumberOfProvince():
    house_dao = HouseDao()
    some = house_dao.getHouseNumberOfProvince()
    house_dao.close()
    return jsonify(some)

@housecontroller.route('/getmeanprice', methods=['POST', 'GET'])
def getmeanprice():
    houseDao = HouseDao()
    cityClass = CityClass()
    tier1unitprice =[]
    newtier1unitprice =[]
    tier2unitprice =[]
    tier3unitprice = []
    tier1, newtier1, tier2, tier3 = cityClass.getCites()
    results = houseDao.statisticHouseAvgSalaryByCity()
    for result in results:
        if result['city'] in tier1:
            tier1unitprice.append(result['s'])
        elif result['city'] in newtier1:
            newtier1unitprice.append(result['s'])
        elif result['city'] in tier2:
            tier2unitprice.append(result['s'])
        elif result['city'] in tier3:
            tier3unitprice.append(result['s'])
            pass
        pass
    pass
    tier1meanprice = int(np.mean(tier1unitprice))
    newtier1meanprice = int(np.mean(newtier1unitprice))
    tier2meanprice = int(np.mean(tier2unitprice))
    tier3meanprice = int(np.mean(tier3unitprice))
    data = [{'name': '一线城市', 'value': tier1meanprice}, {'name': '新一线城市', 'value': newtier1meanprice}, {'name': '二线城市', 'value': tier2meanprice}, {'name': '三线城市', 'value': tier3meanprice}]

    return jsonify(data)
    pass