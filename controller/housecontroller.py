# jyq创
from flask import Blueprint, jsonify, request
from dao.housedao import HouseDao
import json,decimal

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
