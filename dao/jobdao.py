from dao.basedao import BaseDao

class JobDao(BaseDao):

    def createJobData(self, param):
        sql = "insert into t_jobdata (jobname, jobcompany, jobaddress," \
              "jobsalary,jobdate,joblink,jobcity, lowsalary, highsalary, meansalary, jobtype) " \
              "values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        return self.execute(sql, param)
        pass

    # 使用SQL语句来统计分析数据：聚合函数
    def statisticJobTypeAvgSalary(self):
        sql = "select avg(meansalary) as s, jobtype from t_jobdata group by jobtype"
        self.execute(sql, ret='dict')
        return self.fetchall()
        pass

    def statisticJobTypeJobCount(self):
        sql = "select count(*) as s, jobtype from t_jobdata group by jobtype"
        self.execute(sql, ret='dict')
        return self.fetchall()
        pass

    def statisticCityJobCount(self):
        sql = "select count(*) as value, jobcity as name from t_jobdata group by jobcity"
        self.execute(sql, ret='dict')
        return self.fetchall()
        pass

    def getJobList(self):
        sql = "select * from t_jobdata"
        self.execute(sql, ret='dict')
        return self.fetchall()
        pass

    # 需要一个list，每一个list里面有一个字典，字典里面两个值，一个是省，一个是数字
    def getCityList(self):
        sql = "select avg(unitprice),province from t_lp group by province;"
        self.execute(sql, ret='dict')
        datas = self.fetchall()
        provincePrices = []
        for data in datas:
            province = data.get('province')
            price = int(data.get('avg(unitprice)'))
            dict = {'name': province, 'value': price}
            provincePrices.append(dict)

        return provincePrices
    pass