from flask import Blueprint, jsonify, request
from ..dao.jobdao import JobDao
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
import jieba
import sklearn

jobcontroller = Blueprint('jobcontroller', __name__)

@jobcontroller.route("/jobview", method=['POST'])
def jobview():
    jobDao = JobDao()
    profile = request.form.get("introduction")
    jobList = jobDao.getJobList()

    # 编写基于内容的推荐功能
    content = []
    profile = ' '.join(jieba.cut(profile))
    content.append(profile)
    for job in jobList():
        jobText = job.get('jobdetail')

    pass

    vectorizer = CountVectorizer()

    # 传入词库，用于统计词库和词数
    # tf = vectorizer.fit_transform(texts)

    # 得到词库。词汇表
    # words = vectorizer.get_feature_names()
    # print(words)

    # 查看词频统计
    # print(tf.toarray())  #
    #
    # tfidfTransformer = TfidfTransformer()

    # 计算tf-idf
    # tfiwf = tfidfTransformer.fit_transform(tf)
    # 查看每句话的tf-idf值
    # print(tfiwf.toarray())

    # from sklearn.metrics.pairwise import linear_kernel

    # 通过向量的余弦相似度，计算出第一个文本和所有其他文本之间的相似度（注意此处包含了自己）
    # cosine_similarities = linear_kernel(tfidf[0:1], tfidf).flatten()
    # print(cosine_similarities)