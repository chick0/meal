# -*- coding: utf-8 -*-

from flask import Blueprint, session
from flask import render_template, redirect, url_for

from sqlalchemy.exc import OperationalError

from models import Poem


bp = Blueprint(
    name=__name__.split(".")[-1],
    import_name=__name__,
    url_prefix=f"/{__name__.split('.')[-1]}"
)


def get_school_data(idx: str):
    try:
        name = session[idx]['name']      # 학교 이름

        edu = session[idx]['edu']        # 교육청 코드
        school = session[idx]['school']  # 학교 코드

        date = session[idx]['date']      # 날짜 정보

        return name, url_for("meal.show_custom_date",
                             edu_code=edu,
                             school_code=school,
                             date=date)
    except (KeyError, Exception):
        return "학교 검색하러 가기", url_for("index.index")


@bp.route("/")
@bp.route("/<string:idx>")
def index(idx: str = None):
    try:
        ctx = sorted(Poem.query.all(), key=lambda t: t.title)
    except (OperationalError, Exception):  # DB 접속 실패
        ctx = []

    button, target = get_school_data(idx=idx)

    return render_template(
        "read/index.html",
        title="시",

        context=ctx,       # 작품들

        idx=idx,           # 세션 ID
        button=button,     # 뒤로가기 버튼 텍스트
        target=target      # 뒤로가기 버튼 목적지
    )


@bp.route("/<string:author>/<string:title>")
@bp.route("/<string:author>/<string:title>/<string:idx>")
def show(author: str, title: str, idx: str = None):
    ctx = Poem.query.filter_by(
        author=author,     # 작가
        title=title        # 제목
    ).first()

    if ctx is None:
        session['alert'] = "등록된 작품이 아닙니다"
        return redirect(url_for("index.index"))

    button, target = get_school_data(idx=idx)

    return render_template(
        "read/show.html",
        title=ctx.title,   # 제목

        ctx=ctx,           # 시 [제목, 작가, 본문]

        idx=idx,           # 세션 ID
        button=button,     # 뒤로가기 버튼 텍스트
        target=target      # 뒤로가기 버튼 목적지
    )
