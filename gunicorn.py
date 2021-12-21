from multiprocessing import cpu_count

bind = "127.0.0.1:1365"

workers = cpu_count() * 2 + 1
worker_class = "gevent"

wsgi_app = "app:create_app()"

accesslog = "-"
