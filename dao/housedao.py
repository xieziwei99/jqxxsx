from .basedao import BaseDao

class HouseDao(BaseDao):
    # 个别大城市平均房价
    def statisticCityTypeAvgHousePrice(self):
        # sql = "select city as cityname,round(avg(unitprice),2) as avghouseprice from db_py_qiyeshixun.t_lp " \
        #       "where unitprice > 2000 and unitprice <500000 group by city order by avghouseprice desc limit 0,200000"
        sql = "select cityname,avghouseprice from (select city as cityname,round(avg(unitprice),2) as avghouseprice " \
              "from t_lp where unitprice > 2000 and unitprice <500000 group by city " \
              "order by avghouseprice desc limit 0,200000) as a where avghouseprice > 19000"
        self.execute(sql, ret='dict')
        return self.fetchall()
        pass

    # 各省会平均住房面积 包括北上天重四直辖市 不包含澳门、台湾台北、香港 总共31个城市
    def statisticProvincialCapitalAvgHouseArea(self):
        sql = 'select province,cityname,avghousearea from (select province,city as cityname,round(avg(meanarea),2) ' \
              'as avghousearea from t_lp where meanarea > 0 and higharea/lowarea < 10 group by city ' \
              'order by avghousearea desc limit 0,200000) as a where cityname = "哈尔滨" or cityname = "长春" ' \
              'or cityname = "沈阳" or cityname = "石家庄" or cityname = "兰州" or cityname = "西宁" or cityname = "西安" ' \
              'or cityname = "郑州" or cityname = "济南" or cityname = "太原" or cityname = "合肥" or cityname = "武汉" ' \
              'or cityname = "长沙" or cityname = "南京" or cityname = "成都" or cityname = "贵阳" or cityname = "昆明" ' \
              'or cityname = "杭州" or cityname = "南昌" or cityname = "广州" or cityname = "福州" or cityname = "海口" ' \
              'or cityname = "乌鲁木齐" or cityname = "呼和浩特" or cityname = "银川" or cityname = "南宁" ' \
              'or cityname = "拉萨" or cityname = "北京" or cityname = "上海" or cityname = "天津" or cityname = "重庆"'
        self.execute(sql, ret='dict')
        return self.fetchall()
        pass

    # 各省市提供的新房数量
    def getHouseNumberOfProvince(self):
        sql = f'select count(*) as num, province from (select * from t_lp group by link) as lp_distinct group by province;'
        self.execute(sql, ret='dict')
        return self.fetchall()

    #各城市平均新房房价
    def statisticHouseAvgSalaryByCity(self):
        sql='select city,avg(unitprice) as s from t_lp group by city;'
        self.execute(sql, ret='dict')
        return self.fetchall()
        pass
    pass

    def statisticBuildingAreaAvgPrice(self):
        sql = "SELECT elt(interval(meanarea,0,50,100,150,200,250,300,400)," \
              "'0-50平米'," \
              "'50-100平米'," \
              "'100-150平米'," \
              "'150-200平米'," \
              "'200-250平米'," \
              "'250-300平米'," \
              "'300-400平米'," \
              "'400+平米') " \
              "as mianjiqujian," \
              "avg(unitprice) as up " \
              "FROM t_lp " \
              "group by mianjiqujian " \
              "order by field(mianjiqujian," \
              "'0-50平米'," \
              "'50-100平米'," \
              "'100-150平米'," \
              "'150-200平米'," \
              "'200-250平米'," \
              "'250-300平米'," \
              "'300-400平米'," \
              "'400+平米');"
        self.execute(sql, ret='dict')
        return self.fetchall()
        pass
